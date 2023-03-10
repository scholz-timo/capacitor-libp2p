import { EventStructure } from "../../EventListener/IEventListener";
import { ConnectionHandlerEventType } from "./enum/ConnectionHandlerEventType";
import { WithPeerInformation } from "./WithPeerInformation";

/**
 * Event that gets triggered, when a some peer starts a connection to the network.
 */
export interface ConnectionHandlerPeerConnectEvent extends EventStructure<ConnectionHandlerEventType.peer_connect>, WithPeerInformation {

}