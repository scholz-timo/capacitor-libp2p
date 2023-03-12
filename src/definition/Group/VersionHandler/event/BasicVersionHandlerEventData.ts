import type { WithAddress } from '../../../WithAddress';
import type { WithData } from '../../../WithData';

export interface BasicVersionHandlerEventData<T = never>
  extends WithAddress,
    WithData<T> {}
