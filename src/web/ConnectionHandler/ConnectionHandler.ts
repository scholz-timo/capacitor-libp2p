
import { IConnection } from "../../definition/ConnectionHandler/Connection/IConnection";
import { ConnectionHandlerStatus } from "../../definition/ConnectionHandler/ConnectionHandlerStatus";
import { ConnectionHandlerEventStructure, IConnectionHandlerEventTypes } from "../../definition/ConnectionHandler/IConnectionHandler";
import { IStream } from "../../definition/ConnectionHandler/Stream/IStream";
import { IGroup } from "../../definition/Group/IGroup";
import { IVersionHandler } from "../../definition/Group/VersionHandler/IVersionHandler";
import { EventListener } from "../EventListener/EventListener";
import { Libp2p } from "libp2p";

export class ConnectionHandler extends EventListener<IConnectionHandlerEventTypes, ConnectionHandlerEventStructure>  {

    private status: ConnectionHandlerStatus = ConnectionHandlerStatus.STOPPED;

    constructor(
        private connection: Libp2p
    ) {
        super();
    }

    async start(): Promise<void> {
        if (this.status !== ConnectionHandlerStatus.STOPPED) {
            throw new Error("Invalid status.");
        }

        this.status = ConnectionHandlerStatus.STARTING;
        await this.connection.start();
        this.status = ConnectionHandlerStatus.STARTED;
    }
    getStatus(): ConnectionHandlerStatus {
        throw new Error("Method not implemented.");
    }
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    dial(_address: string): Promise<IConnection> {
        throw new Error("Method not implemented.");
    }
    hangUp(_address: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getMyConnections(): IConnection[] {
        throw new Error("Method not implemented.");
    }
    getAllConnection(): Promise<IConnection>[] {
        throw new Error("Method not implemented.");
    }
    getAddresses(): string[] {
        throw new Error("Method not implemented.");
    }
    getStreamForProtocol(_address: string, _protocol: { group: IGroup; version: IVersionHandler; }): Promise<IStream> {
        throw new Error("Method not implemented.");
    }

}