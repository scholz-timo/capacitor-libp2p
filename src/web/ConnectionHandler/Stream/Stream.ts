import { IStreamEventTypes, StreamEventMap } from "../../../definition/ConnectionHandler/Stream/IStream";
import { EventListener } from "../../EventListener/EventListener";
import { Stream as P2PStream } from "@libp2p/interface-connection";

export class Stream extends EventListener<IStreamEventTypes, StreamEventMap> {
    constructor(
        private stream: P2PStream
    ) {
        super();
    }

    async close() {
        await this.stream.close();
    }
}