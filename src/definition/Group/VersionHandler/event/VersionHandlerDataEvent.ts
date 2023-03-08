import { EventStructure } from "../../../EventListener/IEventListener";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";

export interface VersionHandlerDataEvent extends EventStructure<VersionHandlerEventType.data> {

}
