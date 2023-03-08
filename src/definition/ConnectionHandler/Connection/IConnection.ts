import { IEventListener, ReverseMap } from "../../EventListener/IEventListener";
import { ConnectionEventType } from "./event/enum/ConnectionEventType";

export interface IConnection extends IEventListener<ReverseMap<ConnectionEventType>> {
    readonly address: string;
    close(): Promise<void>;
}