import type { Connection as P2PConnection } from '@libp2p/interface-connection';

import { EventListener } from '../../../common/EventListener/EventListener';
import type {
  IConnectionEventTypes,
  ConnectionEventMap,
} from '../../../definition/ConnectionHandler/Connection/IConnection';
import type { WithAddress } from '../../../definition/WithAddress';

export class Connection extends EventListener<
  IConnectionEventTypes,
  ConnectionEventMap
> {
  public readonly source: WithAddress['source'];

  constructor(private connection: P2PConnection) {
    super();

    this.source = {
      address: this.connection.remoteAddr.toString(),
    };
  }

  async close(): Promise<void> {
    await this.connection.close();
  }
}
