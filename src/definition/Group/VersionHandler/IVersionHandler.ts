
import { IProtocolRequestHandler } from '../../Protocol/IProtocolRequestHandler';
import { VersionHandlerEventType } from './enum/VersionHandlerEventType';
import { VersionHandlerEvent } from './VersionHandlerEvent';
import { IPackageSeparator } from '../../PackageSeparator/IPackageSeparator';

export interface IVersionHandler {
    on<T extends VersionHandlerEventType>(event: T, impl: IProtocolRequestHandler<VersionHandlerEvent<T>>, separator: IPackageSeparator): IVersionHandler;
    off<T extends VersionHandlerEventType>(event: T, impl: IProtocolRequestHandler<VersionHandlerEvent<T>>): IVersionHandler;
}