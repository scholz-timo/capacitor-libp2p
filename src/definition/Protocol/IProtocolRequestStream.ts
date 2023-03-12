import type { StreamDirection } from './enum/StreamDirection';

export interface IProtocolRequestStream {
  getStreamDirection(): StreamDirection;
}
