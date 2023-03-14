import type {
  IEventListener,
  ReverseMap,
} from '../EventListener/IEventListener';
import type { IGroup } from '../Group/IGroup';
import type { IVersionHandler } from '../Group/VersionHandler/IVersionHandler';

import type { IConnection } from './Connection/IConnection';
import type { ConnectionHandlerStatus } from './ConnectionHandlerStatus';
import type { IStream } from './Stream/IStream';
import type { ConnectionHandlerPeerConnectEvent } from './event/ConnectionHandlerPeerConnectEvent';
import type { ConnectionHandlerPeerDisconnectEvent } from './event/ConnectionHandlerPeerDisconnectEvent';
import type { ConnectionHandlerEventType } from './event/enum/ConnectionHandlerEventType';

export type IConnectionHandlerEventTypes =
  ReverseMap<ConnectionHandlerEventType>;
export type ConnectionHandlerEventStructure = {
  [ConnectionHandlerEventType.peer_connect]: [
    ConnectionHandlerPeerConnectEvent,
  ];
  [ConnectionHandlerEventType.peer_disconnect]: [
    ConnectionHandlerPeerDisconnectEvent,
  ];
};

/**
 * The connection handler.
 * Handles incoming and outgoing connections, if supported.
 *
 * Has 2 events:
 *  - ConnectionHandlerEventType.peer_connect
 *  - ConnectionHandlerEventType.peer_disconnect
 */
export interface IConnectionHandler
  extends IEventListener<
    IConnectionHandlerEventTypes,
    ConnectionHandlerEventStructure
  > {
  /**
   * Starts the connection.
   */
  start(): Promise<void>;

  /**
   * Gets the status of the current connection handler.
   */
  getStatus(): ConnectionHandlerStatus;

  /**
   * Stops the connection.
   */
  stop(): Promise<void>;

  /**
   * Establishes a new connection to a new peer/client.
   *
   * @param address The address to connect to. Is NOT a normal ip address but one of the addresses returned from this.getAddresses()
   */
  dial(address: string): Promise<IConnection>;

  /**
   * Ends a connection to the specified address.
   *
   * @param address The address to connect to. Is NOT a normal ip address but one of the addresses returned from this.getAddresses()
   */
  hangUp(address: string): Promise<void>;

  /**
   * Returns our current connections.
   */
  getMyConnections(): Promise<IConnection[]>;

  /**
   * Returns our addresses.
   * Can return an empty array, when no inbound connections are supported.
   */
  getAddresses(): Promise<string[]>;

  /**
   * Opens a new stream for the given protocol.
   *
   * @param address The address to connect to. Is NOT a normal ip address but one of the addresses returned from this.getAddresses()
   * @param protocol A object containing a generated "group" and a "version"(handler).
   */
  getStreamForProtocol(
    address: string,
    protocol: { group: IGroup; version: IVersionHandler },
  ): Promise<IStream>;
}
