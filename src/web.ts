import { WebPlugin } from '@capacitor/core';

import type { P2PProviderPlugin } from './definitions';

export class P2PProviderWeb extends WebPlugin implements P2PProviderPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
