import { EventStructure } from "../../EventListener/IEventListener";
import { ConnectionHandlerEventType } from "./enum/ConnectionHandlerEventType";

export interface ConnectionHandlerPeerDisconnectEvent extends EventStructure<ConnectionHandlerEventType.peer_disconnect> {

}