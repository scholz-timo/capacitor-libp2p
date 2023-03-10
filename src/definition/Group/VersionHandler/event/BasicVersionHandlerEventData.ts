import { WithAddress } from "../../../WithAddress";
import { WithData } from "../../../WithData";

export interface BasicVersionHandlerEventData<T = never> extends WithAddress, WithData<T> {

}