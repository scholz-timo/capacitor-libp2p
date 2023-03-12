import type {
  IVersionHandlerEventTypes,
  VersionHandlerEventStructure,
} from '../../../definition/Group/VersionHandler/IVersionHandler';
import { EventListener } from '../../EventListener/EventListener';

export class VersionHandler extends EventListener<
  IVersionHandlerEventTypes,
  VersionHandlerEventStructure
> {
  constructor(public version: string) {
    super();
  }

  getVersion(): string {
    return this.version;
  }
}
