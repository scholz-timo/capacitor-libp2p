
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
                'identity': pin['package']
            }
        })
    } else if (packageContent['version'] == 2) {
        return packageContent['pins'];
    }

    throw new Error("Could not parse version: " + packageContent['version']);
}

const resolvePackages = async (file) => {
    const basePackages = await resolvePackagesBase(file);

    return basePackages.map((basePackage) => ({
        ...basePackage,
        ['identity']: MyPackageJSON?.['podspec']?.['nameOverrides']?.[basePackage['identity']] ?? basePackage['identity']
    }))
}

module.exports = resolvePackages