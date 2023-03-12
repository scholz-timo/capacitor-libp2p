const FileSystem = require('fs');
const Path = require('path');
const ChildProcess = require('child_process');

const executeInDirectory = (command, dir) => {
  return new Promise((resolve, reject) => {
    ChildProcess.exec(command, { cwd: dir }, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const checkout = async (dir, git, revision, onWarn = console.warn) => {
  // Clone the repository into ignored directory

  if (!FileSystem.existsSync(dir)) {
    FileSystem.mkdirSync(dir, { recursive: true });
  }

  await executeInDirectory(`git clone ${git} .`, dir).catch(onWarn);

  // Checkout given tag
  await executeInDirectory(`git checkout ${revision}`, dir).catch(onWarn);

  // Run swift build to create Package.resolved file.
  if (!FileSystem.existsSync(Path.join(dir, '.build'))) {
    await executeInDirectory(`swift build`, dir).catch(onWarn);
  }
};

module.exports = checkout;
