
import { StreamEventType } from './enum/StreamEventType';

interface StreamEventObj {
    readonly stream: Uint8Array;
}

export type StreamEvent<EventType extends StreamEventType> = (event: EventType, content: StreamEventObj) => any;