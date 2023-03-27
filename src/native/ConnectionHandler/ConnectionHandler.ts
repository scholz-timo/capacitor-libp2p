import { EventListener } from '../../common/EventListener/EventListener';
import type { IConnection } from '../../definition/ConnectionHandler/Connection/IConnection';
import { ConnectionHandlerStatus } from '../../definition/ConnectionHandler/ConnectionHandlerStatus';
import type {
  IConnectionHandlerEventTypes,
  ConnectionHandlerEventStructure,
} from '../../definition/ConnectionHandler/IConnectionHandler';
import type { IStream } from '../../definition/ConnectionHandler/Stream/IStream';
import type { IGroup } from '../../definition/Group/IGroup';
import type { IVersionHandler } from '../../definition/Group/VersionHandler/IVersionHandler';
import type { P2PProviderAdapter } from '../../definitions';

import { Connection } from './Connection/Connection';

export class ConnectionHandler extends EventListener<
  IConnectionHandlerEventTypes,
  ConnectionHandlerEventStructure
> {
  private status: ConnectionHandlerStatus = ConnectionHandlerStatus.STOPPED;

  constructor(private adapter: P2PProviderAdapter, private id: string) {
    super();
  }

  async start(): Promise<void> {
    if (this.status !== ConnectionHandlerStatus.STOPPED) {
      throw new Error('Invalid state.');
    }

    this.status = ConnectionHandlerStatus.STARTING;
    try {
      await this.adapter.startP2PInstance({ id: this.id });
    } catch (error) {
      this.status = ConnectionHandlerStatus.STOPPED;
      throw error;
    }

    this.status = ConnectionHandlerStatus.STARTED;
  }
  getStatus(): ConnectionHandlerStatus {
    throw new Error('Not implemented.');
  }
  async stop(): Promise<void> {
    if (this.status !== ConnectionHandlerStatus.STARTED) {
      throw new Error('Invalid status.');
    }

    this.status = ConnectionHandlerStatus.STOPPING;

    try {
      await this.adapter.stopP2PInstance({ id: this.id });
    } catch (error) {
      this.status = ConnectionHandlerStatus.STARTED;
      throw error;
    }

    this.status = ConnectionHandlerStatus.STOPPED;
  }
  async dial(address: string): Promise<IConnection> {
    const { id } = await this.adapter.dial({ id: this.id, address });
    return new Connection(this.adapter, id, address) as any;
  }

  async hangUp(address: string): Promise<void> {
    await this.adapter.hangUp({ id: this.id, address });
  }

  async getMyConnections(): Promise<IConnection[]> {
    const { connections } = await this.adapter.getMyConnections({
      id: this.id,
    });
    return Promise.all(connections.map(({ address }) => this.dial(address)));
  }

  async getAddresses(): Promise<string[]> {
    const { addresses } = await this.adapter.getAddresses({ id: this.id });
    return addresses;
  }

  async getStreamForProtocol(
    _address: string,
    protocol: { group: IGroup; version: IVersionHandler },
  ): Promise<IStream> {
    // const connection = await this.dial(address);

    const { group, version } = protocol;

    if (group.getVersionForVersionHandler(version) !== version.getVersion()) {
      throw new Error('Internal error...');
    }

    // TODO: cache.
    //const { id } = await this.adapter.createLibP2PStream({ id: this.id, connectionId: (connection as any).getId(), groupId: (group as any).getId(), versionHandlerId: (version as any).getId() })
    throw new Error('Not implemented.');
  }
}
