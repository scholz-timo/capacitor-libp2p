
import { VersionHandlerEventType } from './enum/VersionHandlerEventType';

export type VersionHandlerEvent<T extends VersionHandlerEventType> = {
    type: T;
}