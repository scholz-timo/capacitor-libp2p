import type {
  IEventListener,
  ReverseMap,
} from '../../EventListener/IEventListener';

import type { VersionHandlerClosedEvent } from './event/VersionHandlerClosedEvent';
import type { VersionHandlerDataEvent } from './event/VersionHandlerDataEvent';
import type { VersionHandlerErrorEvent } from './event/VersionHandlerErrorEvent';
import type { VersionHandlerReadyEvent } from './event/VersionHandlerReadyEvent';
import type { VersionHandlerEventType } from './event/enum/VersionHandlerEventType';

export type IVersionHandlerEventTypes = ReverseMap<
  typeof VersionHandlerEventType
>;
export type VersionHandlerEventStructure = {
  [VersionHandlerEventType.closed]: [VersionHandlerClosedEvent];
  [VersionHandlerEventType.data]: [VersionHandlerDataEvent];
  [VersionHandlerEventType.error]: [VersionHandlerErrorEvent];
  [VersionHandlerEventType.ready]: [VersionHandlerReadyEvent];
};

/**
 * The version handler is an event bus.
 */
export interface IVersionHandler
  extends IEventListener<
    IVersionHandlerEventTypes,
    VersionHandlerEventStructure
  > {
  getVersion(): string;
}
