import type { IPackageSeparator } from '../PackageSeparator/IPackageSeparator';

import type { IVersionHandler } from './VersionHandler/IVersionHandler';

export interface BasicGroupConfiguration {
  version: string;
  separator?: IPackageSeparator;
}

export interface IGroup {
  getName(): string;
  getVersionForVersionHandler(
    versionHandler: IVersionHandler,
  ): string | undefined;
}

/**
 * GroupFactory interface.
 *
 * Uses the factory pattern to create groups.
 */
export interface IGroupFactory {
  /**
   * Generates a version handler and attaches it to the group factory.
   *
   * @param version
   */
  generateVersionHandler(
    version: BasicGroupConfiguration,
  ): Promise<IVersionHandler>;

  /**
   * Generates a version handler and attaches it to the group factory.
   *
   * @param version
   * @param initializer
   */
  generateVersionHandler(
    version: BasicGroupConfiguration,
    initializer: (versionHandler: IVersionHandler) => any | Promise<any>,
  ): Promise<IVersionHandler>;

  /**
   * Generates the group.
   *
   * After creating the group, it can be used in the creation of connection handlers.
   */
  generate(): Promise<IGroup>;
}
