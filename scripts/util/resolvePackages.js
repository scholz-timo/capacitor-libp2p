
const FileSystem = require('fs');
const MyPackageJSON = require('./resolvePackageJSON');

const resolvePackagesBase = async (file) => {
    if (!FileSystem.existsSync(file)) {
        return []
    }

    const packageContent = JSON.parse(FileSystem.readFileSync(file));

    if (packageContent['version'] == 1) {
        return packageContent['object']['pins'].map((pin) => {
            return {
                ...pin,
                'identity': pin['package'],
                'location': pin['repositoryURL']
            }
        })
    } else if (packageContent['version'] == 2) {
        return packageContent['pins'];
    }

    throw new Error("Could not parse version: " + packageContent['version']);
}

const resolvePackages = async (file, rootPackage = undefined) => {
    let basicPackages = (await resolvePackagesBase(file)).map((basePackage) => ({
        ...basePackage,
        ['identity']: MyPackageJSON?.['podspec']?.['nameOverrides']?.[basePackage['identity']] ?? basePackage['identity']
    }));

    if (rootPackage) {
        const basicPackageLocations = basicPackages.map(({ location }) => location);
        basicPackages = rootPackage.filter((packageDescriptor) => basicPackageLocations.includes(packageDescriptor['location']))
    }

    return basicPackages 
}

module.exports = resolvePackages