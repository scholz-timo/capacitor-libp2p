
import { IProtocolRequestHandler } from '../../Protocol/IProtocolRequestHandler';
import { VersionHandlerEventType } from './enum/VersionHandlerEventType';
import { VersionHandlerEvent } from './VersionHandlerEvents';

export interface IVersionHandler {
    on<T extends VersionHandlerEventType>(event: T, impl: IProtocolRequestHandler<VersionHandlerEvent<T>>): IVersionHandler;
    off<T extends VersionHandlerEventType>(event: T, impl: IProtocolRequestHandler<VersionHandlerEvent<T>>): IVersionHandler;
}