import { WebPlugin } from '@capacitor/core';
import type { P2PProviderPlugin } from './definitions';
import { IGroupFactory, IGroup } from './definition/Group/IGroup';
import { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { packageSeparatorGenerator } from "./web/PackageSeparator/PackageSeparatorGenerator";
import { GroupFactory } from "./web/Group/GroupFactory";
import { DelimiterSeparator } from "./web/PackageSeparator/implementation/DelimiterSeparator";
import { ConnectionHandler } from "./web/ConnectionHandler/ConnectionHandler";
import { createLibp2p } from 'libp2p';
import { IPackageSeparatorGroup } from './definition/PackageSeparator/IPackageSeparator';

const packageSeparator = {
  delimiter: packageSeparatorGenerator((separator: Uint8Array) => {
    return new DelimiterSeparator(separator);
  })
};

const transformer = {
  "string": {
    "toUInt8": (value: string) => uint8ArrayFromString(value),
    "fromUInt8": (value: Uint8Array) => uint8ArrayToString(value),
  }
};

export class P2PProviderWeb extends WebPlugin implements P2PProviderPlugin {
  async createConnectionHandler(_options: { groups: IGroup[]; addresses?: string[]; }): Promise<IConnectionHandler> {
    const libp2p = await createLibp2p({
      start: false
    });

    return new ConnectionHandler(libp2p) as unknown as IConnectionHandler;
  }

  public async ensurePackageSeparator(): Promise<IPackageSeparatorGroup> {
      return packageSeparator;
  }

  public async ensureTransformer() {
    return transformer;
  }

  async createGroupFactory(name: string): Promise<IGroupFactory> {
    return new GroupFactory(name);
  }
}
