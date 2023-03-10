import { EventStructure } from "../../../EventListener/IEventListener";
import { BasicVersionHandlerEventData } from "./BasicVersionHandlerEventData";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";

/**
 * 
 */
export interface VersionHandlerErrorEvent extends EventStructure<VersionHandlerEventType.error>, BasicVersionHandlerEventData<undefined> {

}
