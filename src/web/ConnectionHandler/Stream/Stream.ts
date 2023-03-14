import type { Stream as P2PStream } from '@libp2p/interface-connection';

import type {
  IStreamEventTypes,
  StreamEventMap,
} from '../../../definition/ConnectionHandler/Stream/IStream';
import { EventListener } from '../../../common/EventListener/EventListener';

export class Stream extends EventListener<IStreamEventTypes, StreamEventMap> {
  constructor(private stream: P2PStream) {
    super();
  }

  async close(): Promise<void> {
    await this.stream.close();
  }
}
