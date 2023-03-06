import { IVersionHandler } from './VersionHandler/IVersionHandler';

interface BasicGroupConfiguration {
    version: string;

    /** TODO: Decide for structure... */
    handlers?: any[];
}

export interface IGroup {}

export interface IGroupFactory {
    generateVersionHandler(version: BasicGroupConfiguration): IVersionHandler;
    generateVersionHandler(version: BasicGroupConfiguration, factory: (versionHandler: IVersionHandler) => any): IGroupFactory;



    generate(): IGroup;
}
