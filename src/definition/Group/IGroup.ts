import { IVersionHandler } from './VersionHandler/IVersionHandler';

export interface BasicGroupConfiguration {
    version: string;
}

export interface IGroup {
    getName(): string;
    getVersionForVersionHandler(versionHandler: IVersionHandler): string|undefined;
}

/**
 * GroupFactory interface.
 * 
 * Uses the factory pattern to create groups.
 */
export interface IGroupFactory {

    /**
     * Generates a version handler and attaches it to the group factory.
     * 
     * @param version 
     */
    generateVersionHandler(version: BasicGroupConfiguration): IVersionHandler;

    /**
     * Generates a version handler and attaches it to the group factory.
     * 
     * @param version 
     * @param initializer 
     */
    generateVersionHandler(version: BasicGroupConfiguration, initializer: (versionHandler: IVersionHandler) => any|Promise<any>): this;

    /**
     * Generates the group.
     * 
     * After creating the group, it can be used in the creation of connection handlers.
     */
    generate(): Promise<IGroup>;
}
