import type { EventStructure } from '../../../EventListener/IEventListener';

import type { BasicVersionHandlerEventData } from './BasicVersionHandlerEventData';
import type { VersionHandlerEventType } from './enum/VersionHandlerEventType';

/**
 *
 */
export interface VersionHandlerDataEvent
  extends EventStructure<VersionHandlerEventType.data>,
    BasicVersionHandlerEventData {
  data: Uint8Array;
}
