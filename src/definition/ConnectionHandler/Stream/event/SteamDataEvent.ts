import type { EventStructure } from '../../../EventListener/IEventListener';
import type { WithAddress } from '../../../WithAddress';
import type { WithData } from '../../../WithData';

import type { StreamEventType } from './enum/StreamEventType';

export interface StreamDataEvent
  extends EventStructure<StreamEventType.data>,
    WithAddress,
    WithData {}
