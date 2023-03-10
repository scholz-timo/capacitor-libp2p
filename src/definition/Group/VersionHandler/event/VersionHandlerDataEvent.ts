import { EventStructure } from "../../../EventListener/IEventListener";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";
import { BasicVersionHandlerEventData } from "./BasicVersionHandlerEventData";

/**
 * 
 */
export interface VersionHandlerDataEvent extends EventStructure<VersionHandlerEventType.data>, BasicVersionHandlerEventData {
    data: Uint8Array;
}
