
const Path = require('path');
const FileSystem = require('fs');

const workingDirectory = process.cwd();

let currentIOSPath = undefined;
try {
    currentIOSPath = JSON.parse(FileSystem.readFileSync(Path.join(`${workingDirectory}`, 'capacitor.config.json')))?.['ios']?.['path'];
} catch (error) {}

if (currentIOSPath === undefined) {
    currentIOSPath = `${workingDirectory}/ios/`
}

currentIOSPath = Path.resolve(Path.join(currentIOSPath, 'App'));

module.exports = currentIOSPath