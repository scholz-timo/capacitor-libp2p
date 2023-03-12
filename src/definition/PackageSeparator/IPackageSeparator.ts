/* eslint-disable */
export interface IPackageSeparator {}
/* eslint-enable */

export interface IPackageSeparatorGroup {
  delimiter: (value: Uint8Array) => IPackageSeparator;
}
