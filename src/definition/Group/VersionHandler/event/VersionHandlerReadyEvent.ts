import { EventStructure } from "../../../EventListener/IEventListener";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";

export interface VersionHandlerReadyEvent extends EventStructure<VersionHandlerEventType.ready> {

}
