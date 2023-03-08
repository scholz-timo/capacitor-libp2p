
import { IEventListener, ReverseMap } from '../../EventListener/IEventListener';
import { StreamEventType } from './event/enum/StreamEventType';

import { StreamDataEvent } from  "./event/SteamDataEvent";
import { StreamErrorEvent } from "./event/SteamErrorEvent";
import { StreamClosedEvent } from  "./event/StreamClosedEvent";

export interface IStream extends IEventListener<ReverseMap<StreamEventType>, {
    [StreamEventType.data]: StreamDataEvent,
    [StreamEventType.closed]: StreamClosedEvent,
    [StreamEventType.error]: StreamErrorEvent
}> {
    close(): Promise<void>;
}