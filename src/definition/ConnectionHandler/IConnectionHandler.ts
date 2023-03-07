import { IConnection } from "./Connection/IConnection";
import { IStream } from "./Stream/IStream";

export interface IConnectionHandler {
    start(): Promise<void>;
    stop(): Promise<void>;


    dial(address: string): Promise<IConnection>;
    hangUp(address: string): Promise<void>;
    getAddresses(): string[];
    getStreamForProtocol(address: string, protocol: string): Promise<IStream>;
}