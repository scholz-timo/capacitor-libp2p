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
  constructor(public version: string, private id: string) {
    super();
  }

  getId() {
    return this.id;
  }

  getPackageSeparator(): IPackageSeparator {
    throw new Error('Not implemented...');
  }

  getVersion(): string {
    return this.version;
  }
}
