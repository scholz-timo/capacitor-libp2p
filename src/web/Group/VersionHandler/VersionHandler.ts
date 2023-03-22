import { EventListener } from '../../../common/EventListener/EventListener';
import type {
  IVersionHandlerEventTypes,
  VersionHandlerEventStructure,
} from '../../../definition/Group/VersionHandler/IVersionHandler';
import type { IPackageSeparator } from '../../../definition/PackageSeparator/IPackageSeparator';

export class VersionHandler extends EventListener<
  IVersionHandlerEventTypes,
  VersionHandlerEventStructure
> {
  constructor(private version: string, private separator: IPackageSeparator) {
    super();
  }

  getPackageSeparator(): IPackageSeparator {
    return this.separator;
  }

  getVersion(): string {
    return this.version;
  }
}
