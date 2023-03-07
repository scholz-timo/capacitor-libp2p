import { IVersionHandler } from './VersionHandler/IVersionHandler';

interface BasicGroupConfiguration {
    version: string;

    /** TODO: Decide for structure... */
    handlers: IVersionHandler[];
}

export interface IGroup {}

export interface IGroupFactory {
    generateVersionHandler(version: BasicGroupConfiguration): IVersionHandler;
    generateVersionHandler(version: BasicGroupConfiguration, initializer: (versionHandler: IVersionHandler) => any|Promise<any>): IGroupFactory;

    generate(): Promise<IGroup>;
}
