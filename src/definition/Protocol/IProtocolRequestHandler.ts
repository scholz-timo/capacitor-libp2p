import { IProtocolRequestStream } from "./IProtocolRequestStream";
import { ProtocolRequestHandlerResponse } from "./enum/ProtocolRequestHandlerResponse";

export interface IProtocolRequestHandlerObj {
    readonly stream: IProtocolRequestStream;
}

export type IProtocolRequestHandler<Event> = (event: Event, content: IProtocolRequestHandlerObj) => ProtocolRequestHandlerResponse;
