import { EventStructure } from "../../../EventListener/IEventListener";
import { StreamEventType } from "./enum/StreamEventType";
import { WithAddress } from "../../../WithAddress";
import { WithData } from "../../../WithData";


export interface StreamDataEvent extends EventStructure<StreamEventType.data>, WithAddress, WithData {
}
