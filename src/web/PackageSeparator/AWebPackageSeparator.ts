import type { IPackageSeparator } from '../../definition/PackageSeparator/IPackageSeparator';

export abstract class AWebPackageSeparator implements IPackageSeparator {
  abstract separate(previous: Uint8Array, current: Uint8Array): Uint8Array[];
}
