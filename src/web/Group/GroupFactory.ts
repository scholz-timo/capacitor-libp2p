import type {
  BasicGroupConfiguration,
  IGroup,
  IGroupFactory,
} from '../../definition/Group/IGroup';
import type { IVersionHandler } from '../../definition/Group/VersionHandler/IVersionHandler';

import { Group } from './Group';
import { VersionHandler } from './VersionHandler/VersionHandler';

export class GroupFactory implements IGroupFactory {
  private versionHandlers: Record<
    string,
    Promise<VersionHandler> | VersionHandler
  > = {};

  constructor(private name: string) {}

  generateVersionHandler(version: BasicGroupConfiguration): IVersionHandler;
  generateVersionHandler(
    version: BasicGroupConfiguration,
    initializer: (handler: IVersionHandler) => any,
  ): this;
  generateVersionHandler(
    { version }: BasicGroupConfiguration,
    initializer?: (handler: IVersionHandler) => any,
  ): this | IVersionHandler {
    if (this.versionHandlers[version] !== undefined) {
      throw new Error('Duplicate version registration...');
    }

    const versionHandler = new VersionHandler(version);

    if (initializer) {
      /* eslint-disable */
      this.versionHandlers[version] = new Promise(async (resolve, reject) => {
        /* eslint-enable */
        try {
          await initializer(versionHandler as any);
          resolve(versionHandler);
        } catch (error) {
          reject(error);
        }
      });
      return this;
    }

    this.versionHandlers[version] = versionHandler;
    return versionHandler as any;
  }

  async generate(): Promise<IGroup> {
    const resolvedVersionHandlers = Object.fromEntries(
      await Promise.all(
        Object.entries(this.versionHandlers).map(
          async ([version, versionHandler]) =>
            [version, await versionHandler] as const,
        ),
      ),
    );
    return new Group(this.name, resolvedVersionHandlers);
  }
}
