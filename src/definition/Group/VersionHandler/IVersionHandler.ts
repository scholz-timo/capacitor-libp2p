import { VersionHandlerEventType } from './event/enum/VersionHandlerEventType';
import { IEventListener, ReverseMap } from '../../EventListener/IEventListener';

import { VersionHandlerClosedEvent } from "./event/VersionHandlerClosedEvent";
import { VersionHandlerDataEvent } from "./event/VersionHandlerDataEvent";
import { VersionHandlerErrorEvent } from "./event/VersionHandlerErrorEvent";
import { VersionHandlerReadyEvent } from "./event/VersionHandlerReadyEvent";

/**
 * The version handler is an event bus.
 */
export interface IVersionHandler extends IEventListener<ReverseMap<typeof VersionHandlerEventType>, {
    [VersionHandlerEventType.closed]: [VersionHandlerClosedEvent],
    [VersionHandlerEventType.data]: [VersionHandlerDataEvent],
    [VersionHandlerEventType.error]: [VersionHandlerErrorEvent],
    [VersionHandlerEventType.ready]: [VersionHandlerReadyEvent],
}> { }
