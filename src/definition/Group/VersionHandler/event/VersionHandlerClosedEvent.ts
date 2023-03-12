import type { EventStructure } from '../../../EventListener/IEventListener';

import type { BasicVersionHandlerEventData } from './BasicVersionHandlerEventData';
import type { VersionHandlerEventType } from './enum/VersionHandlerEventType';

/**
 *
 */
export interface VersionHandlerClosedEvent
  extends EventStructure<VersionHandlerEventType.closed>,
    BasicVersionHandlerEventData {}
