
import { IGroup } from "../../definition/Group/IGroup";
import { VersionHandler } from "./VersionHandler/VersionHandler";

export class Group implements IGroup {
    constructor(
        public name: string,
        public readonly versions: Record<string, VersionHandler>
    ) {}
}