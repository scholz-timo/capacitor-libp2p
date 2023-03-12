import { IVersionHandler, IVersionHandlerEventTypes, VersionHandlerEventStructure } from "../../../definition/Group/VersionHandler/IVersionHandler";
import { EventListener } from "../../EventListener/EventListener";

export class VersionHandler extends EventListener<IVersionHandlerEventTypes, VersionHandlerEventStructure> implements IVersionHandler {
    constructor(
        public version: string
    ) {
        super();
    }
}
