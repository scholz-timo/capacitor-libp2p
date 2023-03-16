import { multiaddr } from '@multiformats/multiaddr';
import type { Libp2p } from 'libp2p';

import type { IConnection } from '../../definition/ConnectionHandler/Connection/IConnection';
import { ConnectionHandlerStatus } from '../../definition/ConnectionHandler/ConnectionHandlerStatus';
import type {
  ConnectionHandlerEventStructure,
  IConnectionHandlerEventTypes,
} from '../../definition/ConnectionHandler/IConnectionHandler';
import type { IStream } from '../../definition/ConnectionHandler/Stream/IStream';
import type { IGroup } from '../../definition/Group/IGroup';
import type { IVersionHandler } from '../../definition/Group/VersionHandler/IVersionHandler';
import { EventListener } from '../../common/EventListener/EventListener';

import { Connection } from './Connection/Connection';
import { Stream } from './Stream/Stream';

export class ConnectionHandler extends EventListener<
  IConnectionHandlerEventTypes,
  ConnectionHandlerEventStructure
> {
  
  private status: ConnectionHandlerStatus = ConnectionHandlerStatus.STOPPED;

  constructor(private connection: Libp2p) {
    super();
  }

  async start(): Promise<void> {
    if (this.status !== ConnectionHandlerStatus.STOPPED) {
      throw new Error('Invalid status.');
    }

    this.status = ConnectionHandlerStatus.STARTING;
    try {
      await this.connection.start();
    } catch(error) {
      this.status = ConnectionHandlerStatus.STOPPED;
      throw error;
    }

    this.status = ConnectionHandlerStatus.STARTED;
  }
  getStatus(): ConnectionHandlerStatus {
    return this.status;
  }
  async stop(): Promise<void> {
    if (this.status !== ConnectionHandlerStatus.STARTED) {
      throw new Error('Invalid status.');
    }

    this.status = ConnectionHandlerStatus.STOPPING;
    try {
      await this.connection.stop();
    } catch(error) {
      this.status = ConnectionHandlerStatus.STARTED;
      throw error;
    }

    this.status = ConnectionHandlerStatus.STOPPED;
  }
  async dial(address: string): Promise<IConnection> {
    const connection = await this.connection.dial(multiaddr(address));
    // TODO: cache.
    return new Connection(connection) as any;
  }
  async hangUp(address: string): Promise<void> {
    await this.connection.hangUp(multiaddr(address));
  }
  
  async getMyConnections(): Promise<IConnection[]> {
    return this.connection
      .getConnections()
      .map(connection => new Connection(connection) as any);
  }

  async getAddresses(): Promise<string[]> {
    return this.connection
      .getMultiaddrs()
      .map(multiaddr => multiaddr.toString());
  }
  async getStreamForProtocol(
    address: string,
    protocol: { group: IGroup; version: IVersionHandler },
  ): Promise<IStream> {
    const { group, version } = protocol;

    if (group.getVersionForVersionHandler(version) !== version.getVersion()) {
      throw new Error('Internal error...');
    }

    const stream = await this.connection.dialProtocol(
      multiaddr(address),
      group.getName() + '/' + version.getVersion(),
    );

    // TODO: cache.
    return new Stream(stream) as any;
  }
}
