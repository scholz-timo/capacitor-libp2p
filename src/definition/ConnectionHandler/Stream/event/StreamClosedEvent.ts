
import { EventStructure } from "../../../EventListener/IEventListener";
import { StreamEventType } from "./enum/StreamEventType";
import { WithAddress } from "../../../WithAddress";

export interface StreamClosedEvent extends EventStructure<StreamEventType.closed>, WithAddress {
    
}
