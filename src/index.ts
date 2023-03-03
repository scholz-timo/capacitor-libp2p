import { registerPlugin } from '@capacitor/core';

import type { P2PProviderPlugin } from './definitions';

const P2PProvider = registerPlugin<P2PProviderPlugin>('P2PProvider', {
  web: () => import('./web').then(m => new m.P2PProviderWeb()),
});

export * from './definitions';
export { P2PProvider };
