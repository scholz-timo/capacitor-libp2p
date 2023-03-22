/* eslint-disable */
export interface IPackageSeparator {
  separate(previous: Uint8Array, current: Uint8Array): Uint8Array[];
  formatMessage(message: Uint8Array): Uint8Array;
}
/* eslint-enable */

export interface IPackageSeparatorGroup {
  delimiter: (value: Uint8Array) => IPackageSeparator;
}
