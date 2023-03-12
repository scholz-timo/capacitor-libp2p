import type { IGroup } from '../../definition/Group/IGroup';
import type { IVersionHandler } from '../../definition/Group/VersionHandler/IVersionHandler';

import type { VersionHandler } from './VersionHandler/VersionHandler';

export class Group implements IGroup {
  constructor(
    private name: string,
    private readonly versions: Record<string, VersionHandler | IVersionHandler>,
  ) {}
  getName(): string {
    return this.name;
  }
  getVersionForVersionHandler(
    versionHandler: IVersionHandler,
  ): string | undefined {
    return this.versions[versionHandler.getVersion()] === versionHandler
      ? versionHandler.getVersion()
      : undefined;
  }
}
