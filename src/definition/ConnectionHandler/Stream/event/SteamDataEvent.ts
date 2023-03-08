import { EventStructure } from "../../../EventListener/IEventListener";
import { StreamEventType } from "./enum/StreamEventType";
import { EventWithAddress } from "./WithAddress";
import { EventWithData } from "./WithData";


export interface StreamDataEvent extends EventStructure<StreamEventType.data>, EventWithAddress, EventWithData {
}
