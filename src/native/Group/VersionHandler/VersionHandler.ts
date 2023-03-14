import type {
    IVersionHandlerEventTypes,
    VersionHandlerEventStructure,
  } from '../../../definition/Group/VersionHandler/IVersionHandler';
  import { EventListener } from '../../../common/EventListener/EventListener';
  
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
  
    getVersion(): string {
      return this.version;
    }
  }
  