import { IVersionHandler } from './VersionHandler/IVersionHandler';

interface BasicGroupConfiguration {
    version: string;

    /** TODO: Decide for structure... */
    handlers: IVersionHandler[];
}

export interface IGroup {}

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
