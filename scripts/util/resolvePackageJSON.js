const FileSystem = require('fs');
const Path = require('path');

const currentPackageJSON = JSON.parse(
  FileSystem.readFileSync(Path.join(__dirname, '..', '..', 'package.json')),
);

module.exports = currentPackageJSON;
