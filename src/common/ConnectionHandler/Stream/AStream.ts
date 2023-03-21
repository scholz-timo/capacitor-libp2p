import { StreamEventType } from "../../../definition/ConnectionHandler/Stream/event/enum/StreamEventType";
import { IStreamEventTypes, StreamEventMap } from "../../../definition/ConnectionHandler/Stream/IStream";
import { IPackageSeparator } from "../../../definition/PackageSeparator/IPackageSeparator";
import { EventListener } from "../../EventListener/EventListener";

export abstract class AStream extends EventListener<
    IStreamEventTypes,
    StreamEventMap,
    undefined,
    undefined
> {

    protected abstract readonly address: string;

    private dataStorage?: Uint8Array = new Uint8Array();

    /**
     * Gets the package separator derived from the VersionHandler.
     */
    protected abstract getPackageSeparator(): IPackageSeparator;

    protected onData(data: Uint8Array) {

        if (this.dataStorage === undefined) {
            throw new Error("Post-Clean calls are not supported.");
        }

        const packageSeparator = this.getPackageSeparator() as any;

        const result = packageSeparator.separate(
            this.dataStorage,
            data
        );

        while (result.length > 1) {
            // TODO: Check for errors and handle?.
            this.basicEmit(StreamEventType.data, [{
                source: {
                    address: this.address,
                },
                stream: result.shift()!,
                type: StreamEventType.data,
                partial: false
            }], undefined);
        }

        this.dataStorage = result[0];
    }

    private flushDataStorage() {

        if (this.dataStorage === undefined) {
            return;
        }

        this.basicEmit(StreamEventType.data, [{
            source: {
                address: this.address,
            },
            stream: this.dataStorage,
            type: StreamEventType.data,
            partial: true
        }], undefined);

        delete this.dataStorage;
    }

    protected onError() {
        this.basicEmit(StreamEventType.error, [{
            source: {
                address: this.address,
            },
            type: StreamEventType.error,
        }], undefined);
    }

    protected onClosed() {
        this.flushDataStorage();

        this.basicEmit(StreamEventType.closed, [{
            source: {
                address: this.address,
            },
            type: StreamEventType.closed,
        }], undefined);
    }

    public abstract send(data: Uint8Array): Promise<void>;
}