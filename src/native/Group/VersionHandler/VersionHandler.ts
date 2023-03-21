import type {
    IVersionHandlerEventTypes,
    VersionHandlerEventStructure,
  } from '../../../definition/Group/VersionHandler/IVersionHandler';
  import { EventListener } from '../../../common/EventListener/EventListener';
import { IPackageSeparator } from '../../../definition/PackageSeparator/IPackageSeparator';
  
  export class VersionHandler extends EventListener<
    IVersionHandlerEventTypes,
    VersionHandlerEventStructure
  > {
    constructor(
        public version: string,
        public id: string
    ) {
      super();
    }

    getPackageSeparator(): IPackageSeparator {
      throw new Error("Not implemented...");
    }
  
    getVersion(): string {
      return this.version;
    }
  }
  