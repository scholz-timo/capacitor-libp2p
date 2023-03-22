const FileSystem = require('fs');
const Path = require('path');

const currentPackageJSON = require('../resolvePackageJSON');
const podspecTemplate = FileSystem.readFileSync(
  Path.join(__dirname, '..', '..', '..', 'podspec.template'),
).toString();

const generatePodSpecId = ({ identity, state: { revision } }) => {
  return `${identity}`;
};

/**
 * (Generates or Copies) one or multiple podspec files into the package.
 *
 * @param {*} packageContent
 * @returns An array of podspecs, might be empty.
 */
const generatePodSpec = (packageContent, podspecSources = {}) => {
  if (
    currentPackageJSON?.['podspec']?.['overrides']?.[
      packageContent.packageContent['identity']
    ] !== undefined
  ) {
    // If we override, we dont need to generate any podspec.

    const modifyOverrides = dependency => ({
      isFile: false,
      dependency,
    });

    const results =
      currentPackageJSON?.['podspec']?.['overrides']?.[
        packageContent.packageContent['identity']
      ];
    if (Array.isArray(results)) {
      return results.map(modifyOverrides);
    }

    return [modifyOverrides(results)];
  }

  // Check if we have any podspecs for the package in our custom directory, if yes, copy.
  const possibleOverrideDirectory = Path.join(
    __dirname,
    '..',
    '..',
    '..',
    'podspecs',
    packageContent.packageContent['identity'],
  );
  if (FileSystem.existsSync(possibleOverrideDirectory)) {
    const resultingPodSpecs = [];

    FileSystem.readdirSync(possibleOverrideDirectory).forEach(element => {
      if (!element.endsWith('.podspec')) {
        return;
      }

      const dependency = element.substring(
        0,
        element.length - '.podspec'.length,
      );
      const inFileName = Path.join(possibleOverrideDirectory, element);
      const outFileName = Path.join(packageContent['targetDir'], element);
      try {
        FileSystem.unlinkSync(outFileName);
      } catch (error) {
        console.warn(error);
      }

      FileSystem.copyFileSync(inFileName, outFileName);
      resultingPodSpecs.push({
        isFile: true,
        dependency,
        podspecPath: outFileName,
      });
    });
    if (
      currentPackageJSON?.['podspec']?.['manualDependencies']?.[
        packageContent.packageContent['identity']
      ]
    ) {
      return currentPackageJSON?.['podspec']?.['manualDependencies']?.[
        packageContent.packageContent['identity']
      ]
        .map(dependencyName => {
          return resultingPodSpecs.find(
            podSpec => podSpec.dependency === dependencyName,
          );
        })
        .filter(Boolean);
    }

    return resultingPodSpecs;
  }

  const podspecPath = Path.join(
    packageContent['targetDir'],
    `${packageContent.packageContent['identity']}.podspec`,
  );

  try {
    FileSystem.unlinkSync(podspecPath);
  } catch (error) {
    console.warn(error);
  }

  const fileDependency = dependency => `"${dependency}", "0.0.0"`;

  const resolveDependency = packageContent => {
    const sources = podspecSources[generatePodSpecId(packageContent)];
    if (sources) {
      return sources.map(({ dependency, isFile }) => {
        if (isFile) {
          return fileDependency(dependency);
        }
        return `"${dependency}"`;
      });
    }

    return fileDependency(packageContent['identity']);
  };

  const allDependencies = packageContent.dependencies
    .map(poddependency => resolveDependency(poddependency))
    .flat();
  const podspec = podspecTemplate
    .replaceAll('PPPNAMEPPP', packageContent.packageContent['identity'])
    .replaceAll('PPPSOURCEPPP', packageContent.packageContent['location'])
    .replaceAll(
      'PPPDEPENDENCIESPPP',
      allDependencies
        .map(dependency => `s.dependency ${dependency}`)
        .join('\n'),
    )
    .replaceAll(
      'PPPSOURCEFINDERPPPP',
      currentPackageJSON?.['podspec']?.['includes']?.[
        packageContent.packageContent['identity']
      ] ?? '"{Sources,Source}/**/*.{swift,h,m,c,cc,mm,cpp}"',
    );

  FileSystem.writeFileSync(podspecPath, podspec);

  return [
    {
      isFile: true,
      dependency: packageContent.packageContent['identity'],
      podspecPath,
    },
  ];
};

module.exports = {
  generatePodSpec,
  generatePodSpecId,
};
