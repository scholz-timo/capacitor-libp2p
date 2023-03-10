import { EventStructure } from "../../../EventListener/IEventListener";
import { StreamEventType } from "./enum/StreamEventType";
import { WithAddress } from "../../../WithAddress";
import { WithData } from "../../../WithData";

export interface StreamErrorEvent extends EventStructure<StreamEventType.error>, WithAddress, WithData<Uint8Array|undefined> {

}
