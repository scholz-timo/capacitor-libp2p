import { IEventListener, ReverseMap } from "../EventListener/IEventListener";
import { IConnection } from "./Connection/IConnection";
import { IStream } from "./Stream/IStream";
import { ConnectionHandlerEventType } from "./event/enum/ConnectionHandlerEventType";

import { ConnectionHandlerPeerConnectEvent } from "./event/ConnectionHandlerPeerConnectEvent";
import { ConnectionHandlerPeerDisconnectEvent } from "./event/ConnectionHandlerPeerDisconnectEvent";

export interface IConnectionHandler extends IEventListener<ReverseMap<ConnectionHandlerEventType>, {
    [ConnectionHandlerEventType.peer_connect]: [ConnectionHandlerPeerConnectEvent],
    [ConnectionHandlerEventType.peer_disconnect]: [ConnectionHandlerPeerDisconnectEvent]
}> {
    start(): Promise<void>;
    stop(): Promise<void>;


    dial(address: string): Promise<IConnection>;
    hangUp(address: string): Promise<void>;
    getAddresses(): string[];
    getStreamForProtocol(address: string, protocol: string): Promise<IStream>;
}