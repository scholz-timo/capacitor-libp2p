import { EventListener } from '../../../common/EventListener/EventListener';
import type {
  IConnectionEventTypes,
  ConnectionEventMap,
} from '../../../definition/ConnectionHandler/Connection/IConnection';
import type { WithAddress } from '../../../definition/WithAddress';
import type { P2PProviderAdapter } from '../../../definitions';

export class Connection extends EventListener<
  IConnectionEventTypes,
  ConnectionEventMap
> {
  public readonly source: WithAddress['source'];

  constructor(
    private adapter: P2PProviderAdapter,
    private id: number,
    address: string,
  ) {
    super();

    this.source = {
      address,
    };
  }

  async close(): Promise<void> {
    await this.adapter.closeConnection({
      id: this.id,
    });
  }
}
