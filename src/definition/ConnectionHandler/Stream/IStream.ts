
import { IEventListener, ReverseMap } from '../../EventListener/IEventListener';
import { StreamEventType } from './event/enum/StreamEventType';

import { StreamDataEvent } from  "./event/SteamDataEvent";
import { StreamErrorEvent } from "./event/SteamErrorEvent";
import { StreamClosedEvent } from  "./event/StreamClosedEvent";

export type IStreamEventTypes = ReverseMap<StreamEventType>;
export type StreamEventMap = {
    [StreamEventType.data]: StreamDataEvent,
    [StreamEventType.closed]: StreamClosedEvent,
    [StreamEventType.error]: StreamErrorEvent
};

export interface IStream extends IEventListener<IStreamEventTypes, StreamEventMap> {
    close(): Promise<void>;
}