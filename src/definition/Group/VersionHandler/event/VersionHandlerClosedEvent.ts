import { EventStructure } from "../../../EventListener/IEventListener";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";
import { BasicVersionHandlerEventData } from "./BasicVersionHandlerEventData";

/**
 * 
 */
export interface VersionHandlerClosedEvent extends EventStructure<VersionHandlerEventType.closed>, BasicVersionHandlerEventData {

}
