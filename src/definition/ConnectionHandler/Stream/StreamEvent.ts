
import { StreamEventType } from './enum/StreamEventType';

interface StreamEventObj {
    readonly stream: Uint8Array;
    readonly source: {
        readonly address: string;
    }
}

export type StreamEvent<EventType extends StreamEventType> = (event: EventType, content: StreamEventObj) => any;