import { isEqual } from 'underscore';

import type { IPackageSeparator } from '../../definition/PackageSeparator/IPackageSeparator';

export const packageSeparatorGenerator = <Args extends any[]>(
  generator: (...args: Args) => IPackageSeparator,
): ((...args: Args) => IPackageSeparator) => {
  const packageSeparatorStorage: Map<
    Args,
    InstanceType<typeof WeakRef>
  > = new Map();

  const findElement = (args: Args): IPackageSeparator | undefined => {
    for (const [key, element] of packageSeparatorStorage.entries()) {
      if (isEqual(key, args)) {
        return element.deref() as IPackageSeparator;
      }
    }
  };

  return (...args: Args) => {
    let ref = findElement(args);

    if (ref !== undefined) {
      return ref;
    }

    ref = generator(...args);
    packageSeparatorStorage.set(args, new WeakRef(ref));
    return ref;
  };
};
