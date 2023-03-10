import { IEventListener, ReverseMap } from "../../EventListener/IEventListener";
import { WithAddress } from "../../WithAddress";
import { ConnectionEventType } from "./event/enum/ConnectionEventType";

export interface IConnection extends IEventListener<ReverseMap<ConnectionEventType>>, WithAddress {
    close(): Promise<void>;
}