import type {
  IEventListener,
  ReverseMap,
} from '../../EventListener/IEventListener';
import type { WithAddress } from '../../WithAddress';

import type { ConnectionEventType } from './event/enum/ConnectionEventType';

export type IConnectionEventTypes = ReverseMap<ConnectionEventType>;
/* eslint-disable */
export type ConnectionEventMap = {};
/* eslint-enable */

export interface IConnection
  extends IEventListener<IConnectionEventTypes, ConnectionEventType>,
    WithAddress {
  close(): Promise<void>;
}
