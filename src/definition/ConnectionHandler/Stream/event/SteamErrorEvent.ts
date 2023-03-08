import { EventStructure } from "../../../EventListener/IEventListener";
import { StreamEventType } from "./enum/StreamEventType";
import { EventWithAddress } from "./WithAddress";
import { EventWithData } from "./WithData";

export interface StreamErrorEvent extends EventStructure<StreamEventType.error>, EventWithAddress, EventWithData<Uint8Array|undefined> {

}
