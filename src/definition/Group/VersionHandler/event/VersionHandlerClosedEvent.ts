import { EventStructure } from "../../../EventListener/IEventListener";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";

export interface VersionHandlerClosedEvent extends EventStructure<VersionHandlerEventType.closed> {

}
