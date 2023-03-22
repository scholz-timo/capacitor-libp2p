import { WebPlugin } from '@capacitor/core';
import { noise } from '@chainsafe/libp2p-noise';
import { mplex } from '@libp2p/mplex';
import { webSockets } from '@libp2p/websockets';
import * as filters from '@libp2p/websockets/filters';
import { createLibp2p } from 'libp2p';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

import { packageSeparatorGenerator } from '../common/PackageSeparator/PackageSeparatorGenerator';
import { DelimiterSeparator } from '../common/PackageSeparator/implementation/DelimiterSeparator';
import type { IConnectionHandler } from '../definition/ConnectionHandler/IConnectionHandler';
import type { IGroupFactory, IGroup } from '../definition/Group/IGroup';
import type { IPackageSeparatorGroup } from '../definition/PackageSeparator/IPackageSeparator';
import type { ITransformerGroup } from '../definition/Tranformer/ITransformer';
import type { P2PProviderPlugin } from '../definitions';

import { ConnectionHandler } from './ConnectionHandler/ConnectionHandler';
import { GroupFactory } from './Group/GroupFactory';

const packageSeparator = {
  delimiter: packageSeparatorGenerator((separator: Uint8Array) => {
    return new DelimiterSeparator(separator);
  }),
};

const transformer = {
  string: {
    toUInt8: (value: string) => uint8ArrayFromString(value),
    fromUInt8: (value: Uint8Array) => uint8ArrayToString(value),
  },
};

export class P2PProviderWeb extends WebPlugin implements P2PProviderPlugin {
  async createConnectionHandler(_options: {
    groups: IGroup[];
    addresses?: string[];
  }): Promise<IConnectionHandler> {
    const libp2p = await createLibp2p({
      start: false,
      transports: [
        webSockets({
          filter: filters.all,
        }),
      ],
      streamMuxers: [mplex()],
      connectionEncryption: [noise()],
    });

    return new ConnectionHandler(libp2p) as unknown as IConnectionHandler;
  }

  public async ensurePackageSeparator(): Promise<IPackageSeparatorGroup> {
    return packageSeparator;
  }

  public async ensureTransformer(): Promise<ITransformerGroup> {
    return transformer;
  }

  async createGroupFactory(name: string): Promise<IGroupFactory> {
    return new GroupFactory(name);
  }
}
