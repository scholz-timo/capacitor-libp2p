
import { StreamEventType } from './enum/StreamEventType';
import { StreamEvent } from './StreamEvent';

export interface IStream {
    on<EventType extends StreamEventType>(event: EventType, callback: StreamEvent<EventType>): IStream;
    off<EventType extends StreamEventType>(event: EventType, callback: StreamEvent<EventType>): IStream;

    close(): Promise<void>;
}