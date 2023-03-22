import type { EventStructure } from '../../../EventListener/IEventListener';
import type { WithAddress } from '../../../WithAddress';

import type { StreamEventType } from './enum/StreamEventType';

export interface StreamErrorEvent
  extends EventStructure<StreamEventType.error>,
    WithAddress {}
