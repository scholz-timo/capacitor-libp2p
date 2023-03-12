import { IEventListener, ReverseMap } from "../../EventListener/IEventListener";
import { WithAddress } from "../../WithAddress";
import { ConnectionEventType } from "./event/enum/ConnectionEventType";

export type IConnectionEventTypes = ReverseMap<ConnectionEventType>;
export type ConnectionEventMap = {}

export interface IConnection extends IEventListener<IConnectionEventTypes, ConnectionEventType>, WithAddress {
    close(): Promise<void>;
}