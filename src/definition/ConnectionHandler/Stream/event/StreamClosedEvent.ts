
import { EventStructure } from "../../../EventListener/IEventListener";
import { StreamEventType } from "./enum/StreamEventType";
import { EventWithAddress } from "./WithAddress";

export interface StreamClosedEvent extends EventStructure<StreamEventType.closed>, EventWithAddress {
    
}
