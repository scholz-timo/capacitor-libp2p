import type { EventStructure } from '../../../EventListener/IEventListener';
import type { WithAddress } from '../../../WithAddress';

import type { StreamEventType } from './enum/StreamEventType';

export interface StreamClosedEvent
  extends EventStructure<StreamEventType.closed>,
    WithAddress {}
