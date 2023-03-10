import { EventStructure } from "../../../EventListener/IEventListener";
import { WithAddress } from "../../../WithAddress";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";

/**
 * 
 */
export interface VersionHandlerReadyEvent extends EventStructure<VersionHandlerEventType.ready>, WithAddress {

}
