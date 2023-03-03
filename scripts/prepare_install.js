#!/usr/bin/env node
"use strict";

const FileSystem = require('fs');
const Path = require('path');
const checkout = require('./util/checkout');
const resolvePackages = require('./util/resolvePackages');
const currentIOSPath = require('./util/cap/resolvePath');
const { generatePodSpec, generatePodSpecId } = require('./util/pod/generatePodSpec');
const injectPodInformation = require('./util/pod/injectPodInformation');
const myPackageJSON = require('./util/resolvePackageJSON');

const packageDirectory = Path.join(__dirname, '..', 'generated-sources');
const resolvedPackagesFile = Path.join(__dirname, '..', 'ios', 'Plugin.xcworkspace', 'xcshareddata', 'swiftpm', 'Package.resolved');


resolvePackages(resolvedPackagesFile).then(async (packages) => {
    console.log("Resolved packages, generating podspecs")

    if (packages.length === 0) {
        console.log("Noting to do, no packages found...");
        return;
    }

    const availableIdentities = packages.map(({ identity }) => identity)
        // Filter out packages, that should be ignored.
        .filter((identity) => [true, undefined].includes(myPackageJSON?.['podspec']?.['ignores']?.includes(identity)))
        .filter((identity) => Object.keys(myPackageJSON?.['podspec']?.['overrides'] ?? {}).includes(identity));

    const storedPackages = {};
    console.log("Downloading packages.");
    await Promise.all(packages.map(
        async (packageContent) => {

            const { location, identity, state: { revision }} = packageContent;

            const targetDir = Path.join(packageDirectory, identity, revision, identity)
            await checkout(targetDir, location, revision);

            const innerDependencies = await resolvePackages(Path.join(targetDir, 'Package.resolved'));

            storedPackages[generatePodSpecId(packageContent)] = {
                packageContent,
                dependencies: innerDependencies.filter(({ identity }) => availableIdentities.includes(identity)),
                targetDir
            }
        }
    ));
    console.log("Downloaded packages...");

    let storedPackageEntries = Object.entries(storedPackages);

    let podTargetLines = [];
    const podspecSources = {};

    do {
        const packagesWithoutDependencies = storedPackageEntries.filter(([, value]) => value.dependencies.length === 0);
        const packagesWithoutDependenciesNames = packagesWithoutDependencies.map(([name]) => name);
        
        if (packagesWithoutDependencies.length === 0) {
            console.log(JSON.stringify(storedPackageEntries, undefined, 2));
            throw new Error("Should never end up here...");
        }
        const newStoredPackageEntries = storedPackageEntries.filter(([name]) => {
            return !packagesWithoutDependenciesNames.includes(name);
        }).map(([name, packages]) => {
            return [name, {
                ...packages,
                dependencies: packages.dependencies.filter((dependency) => !packagesWithoutDependenciesNames.includes(dependency['identity']))
            }];
        })

        storedPackageEntries = newStoredPackageEntries

        for (const packageName of packagesWithoutDependenciesNames) {
            const packageContent = storedPackages[packageName];
            const specs = podspecSources[generatePodSpecId(packageContent.packageContent)] = generatePodSpec(packageContent, podspecSources);

            specs.filter((spec) => spec.isFile).forEach((spec) => {
                podTargetLines.push(`pod "${spec.dependency}", :path => "${Path.relative(currentIOSPath, spec.podspecPath)}"`)
            })
        }
    } while(storedPackageEntries.length > 0);

    podTargetLines = podTargetLines.sort();

    
    const PodFilePath = Path.join(currentIOSPath, 'Podfile');

    const PodFile = FileSystem.readFileSync(PodFilePath).toString();


    const resultingPodFile = injectPodInformation(PodFile, podTargetLines)

    FileSystem.writeFileSync(PodFilePath, resultingPodFile)
})