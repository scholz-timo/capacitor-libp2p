import { EventStructure } from "../../EventListener/IEventListener";
import { ConnectionHandlerEventType } from "./enum/ConnectionHandlerEventType";

export interface ConnectionHandlerPeerConnectEvent extends EventStructure<ConnectionHandlerEventType.peer_connect> {

}