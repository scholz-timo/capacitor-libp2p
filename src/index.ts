import { Capacitor, registerPlugin } from '@capacitor/core';

import type { P2PProviderPlugin, P2PProviderAdapter } from './definitions';
import { P2PProviderNative } from './native/P2PProviderNative';
import { P2PProviderWeb } from './web/P2PProviderWeb';

export * from './definitions';

export * from './definition/Group/VersionHandler/event/enum/VersionHandlerEventType';
export * from './definition/ConnectionHandler/Stream/event/enum/StreamEventType';

export * from './definition/Protocol/enum/StreamDirection';
export * from './definition/Protocol/enum/ProtocolRequestHandlerResponse';

const createP2PProviderPlugin = (): P2PProviderPlugin => {
  if (Capacitor.getPlatform() === 'web') {
    return new P2PProviderWeb();
  } else {
    const P2PProviderAdapter =
      registerPlugin<P2PProviderAdapter>('P2PProvider');
    return new P2PProviderNative(P2PProviderAdapter);
  }
};

const P2PProvider = createP2PProviderPlugin();

export { P2PProvider };
