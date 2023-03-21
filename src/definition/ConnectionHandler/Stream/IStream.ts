import type {
  IEventListener,
  ReverseMap,
} from '../../EventListener/IEventListener';

import type { StreamDataEvent } from './event/SteamDataEvent';
import type { StreamErrorEvent } from './event/SteamErrorEvent';
import type { StreamClosedEvent } from './event/StreamClosedEvent';
import type { StreamEventType } from './event/enum/StreamEventType';

export type IStreamEventTypes = ReverseMap<typeof StreamEventType>;
export type StreamEventMap = {
  [StreamEventType.data]: [StreamDataEvent];
  [StreamEventType.closed]: [StreamClosedEvent];
  [StreamEventType.error]: [StreamErrorEvent];
};

export interface IStream
  extends IEventListener<IStreamEventTypes, StreamEventMap, undefined, undefined> {

  send(data: Uint8Array): Promise<void>;
  close(): Promise<void>;
}
