import { BasicGroupConfiguration, IGroup, IGroupFactory } from "../../definition/Group/IGroup";
import { IVersionHandler } from "../../definition/Group/VersionHandler/IVersionHandler";
import { P2PProviderAdapter } from "../../definitions";
import { VersionHandler } from "./VersionHandler/VersionHandler";
import { Group } from "./Group";

export class GroupFactory implements IGroupFactory {

    private versionHandlers: Record<
        string,
        Promise<VersionHandler> | VersionHandler
    > = {};

    constructor(
        private name: string,
        private P2PProviderAdapter: P2PProviderAdapter
    ) { }

    generateVersionHandler(version: BasicGroupConfiguration): Promise<IVersionHandler>;
    generateVersionHandler(version: BasicGroupConfiguration, initializer: (versionHandler: IVersionHandler) => any): this;
    generateVersionHandler(version: BasicGroupConfiguration, initializer?: (versionHandler: IVersionHandler) => any): this | Promise<IVersionHandler> {
        if (!initializer) {
            return (async () => {
                if (this.versionHandlers[version.version]) {
                    return this.versionHandlers[version.version] as any;
                }

                const { id } = await this.P2PProviderAdapter.createVersionHandler(version);
                const versionHandler = new VersionHandler(version.version, id);
                this.versionHandlers[version.version] = versionHandler;
                return versionHandler;
            })();
        }

        this.versionHandlers[version.version] = (async () => {
            if (this.versionHandlers[version.version] === undefined) {
                const { id } = await this.P2PProviderAdapter.createVersionHandler(version);
                const versionHandler = new VersionHandler(version.version, id);
                this.versionHandlers[version.version] = versionHandler;
            }

            const versionHandler = await this.versionHandlers[version.version];
            await initializer(versionHandler as any);
            return versionHandler;
        })();

        return this;
    }
    async generate(): Promise<IGroup> {
        const resolvedVersionHandlers = Object.fromEntries(
            await Promise.all(
                Object.entries(this.versionHandlers).map(
                    async ([version, versionHandler]) =>
                        [version, await versionHandler] as const,
                ),
            ),
        );


        const { id } = await this.P2PProviderAdapter.createGroup({ name: this.name, versionHandler: Object.values(resolvedVersionHandlers).map((versionHandler) => versionHandler.id) });
        return new Group(this.name, resolvedVersionHandlers, id);
    }

}