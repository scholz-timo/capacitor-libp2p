import { EventStructure } from "../../EventListener/IEventListener";
import { ConnectionHandlerEventType } from "./enum/ConnectionHandlerEventType";

/**
 * Event that gets triggered, when a some peer starts a connection to you.
 */
export interface ConnectionHandlerPeerDisconnectEvent extends EventStructure<ConnectionHandlerEventType.peer_disconnect> {

}