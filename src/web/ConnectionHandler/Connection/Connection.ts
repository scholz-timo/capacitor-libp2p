import { EventListener } from "../../EventListener/EventListener"
import { IConnectionEventTypes, ConnectionEventMap } from "../../../definition/ConnectionHandler/Connection/IConnection";
import { Connection as P2PConnection } from '@libp2p/interface-connection';
import { WithAddress } from "../../../definition/WithAddress";

export class Connection extends EventListener<IConnectionEventTypes, ConnectionEventMap> {

    public readonly source: WithAddress['source'];

    constructor(
        private connection: P2PConnection
    ) {
        super();

        this.source = {
            address: this.connection.remoteAddr.toString()
        }
    }

    async close() {
        await this.connection.close();
    }
}