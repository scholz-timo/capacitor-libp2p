import { IEventListener, ReverseMap } from "../EventListener/IEventListener";
import { IConnection } from "./Connection/IConnection";
import { IStream } from "./Stream/IStream";
import { ConnectionHandlerEventType } from "./event/enum/ConnectionHandlerEventType";

import { ConnectionHandlerPeerConnectEvent } from "./event/ConnectionHandlerPeerConnectEvent";
import { ConnectionHandlerPeerDisconnectEvent } from "./event/ConnectionHandlerPeerDisconnectEvent";
import { ConnectionHandlerStatus } from './ConnectionHandlerStatus';
import { IGroup } from "../Group/IGroup";
import { IVersionHandler } from "../Group/VersionHandler/IVersionHandler";

/**
 * The connection handler.
 * Handles incoming and outgoing connections, if supported.
 * 
 * Has 2 events:
 *  - ConnectionHandlerEventType.peer_connect
 *  - ConnectionHandlerEventType.peer_disconnect
 */
export interface IConnectionHandler extends IEventListener<ReverseMap<ConnectionHandlerEventType>, {
    [ConnectionHandlerEventType.peer_connect]: [ConnectionHandlerPeerConnectEvent],
    [ConnectionHandlerEventType.peer_disconnect]: [ConnectionHandlerPeerDisconnectEvent]
}> {

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
    getMyConnections(): IConnection[];

    /**
     * Returns all the connections. (From peers & their peer & so on)
     */
    getAllConnection(): Promise<IConnection>[];

    /**
     * Returns our addresses.
     * Can return an empty array, when no inbound connections are supported.
     */
    getAddresses(): string[];

    /**
     * Opens a new stream for the given protocol.
     * 
     * @param address The address to connect to. Is NOT a normal ip address but one of the addresses returned from this.getAddresses()
     * @param protocol A object containing a generated "group" and a "version"(handler).
     */
    getStreamForProtocol(address: string, protocol: { group: IGroup, version: IVersionHandler }): Promise<IStream>;
}