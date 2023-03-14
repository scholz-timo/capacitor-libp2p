
import { EventListener } from "../../common/EventListener/EventListener";
import { IConnection } from "../../definition/ConnectionHandler/Connection/IConnection";
import { ConnectionHandlerStatus } from "../../definition/ConnectionHandler/ConnectionHandlerStatus";
import { IConnectionHandlerEventTypes, ConnectionHandlerEventStructure } from "../../definition/ConnectionHandler/IConnectionHandler";
import { IStream } from "../../definition/ConnectionHandler/Stream/IStream";
import { IGroup } from "../../definition/Group/IGroup";
import { IVersionHandler } from "../../definition/Group/VersionHandler/IVersionHandler";
import { P2PProviderAdapter } from "../../definitions";

export class ConnectionHandler extends EventListener<
    IConnectionHandlerEventTypes,
    ConnectionHandlerEventStructure
>  {
    constructor(
        private adapter: P2PProviderAdapter,
        private id: number
    ) {
        super();
    }

    async start(): Promise<void> {
        this.adapter.startP2PInstance({ id: this.id });
    }
    getStatus(): ConnectionHandlerStatus {
        throw new Error("Not implemented.");
    }
    async stop(): Promise<void> {
        this.adapter.stopP2PInstance({ id: this.id });
    }
    async dial(address: string): Promise<IConnection> {
        throw new Error("Not implemented.");
    }

    async hangUp(address: string): Promise<void> {
        throw new Error("Not implemented.");
    }
    getMyConnections(): Promise<IConnection[]> {
        throw new Error("Not implemented.");
    }

    getAddresses(): Promise<string[]> {
        throw new Error("Not implemented.");
    }

    async getStreamForProtocol(
        address: string,
        protocol: { group: IGroup; version: IVersionHandler },
    ): Promise<IStream> {
        const { group, version } = protocol;

        if (group.getVersionForVersionHandler(version) !== version.getVersion()) {
            throw new Error('Internal error...');
        }

        // TODO: cache.
        throw new Error("Not implemented.");
    }
}