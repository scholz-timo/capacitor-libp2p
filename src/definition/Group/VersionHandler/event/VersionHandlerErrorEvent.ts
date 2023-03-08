import { EventStructure } from "../../../EventListener/IEventListener";
import { VersionHandlerEventType } from "./enum/VersionHandlerEventType";

export interface VersionHandlerErrorEvent extends EventStructure<VersionHandlerEventType.error> {

}
