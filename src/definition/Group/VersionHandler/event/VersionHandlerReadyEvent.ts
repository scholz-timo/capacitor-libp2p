import type { EventStructure } from '../../../EventListener/IEventListener';
import type { WithAddress } from '../../../WithAddress';

import type { VersionHandlerEventType } from './enum/VersionHandlerEventType';

/**
 *
 */
export interface VersionHandlerReadyEvent
  extends EventStructure<VersionHandlerEventType.ready>,
    WithAddress {}
