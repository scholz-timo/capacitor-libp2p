import { DelimiterSeparator } from '../common/PackageSeparator/implementation/DelimiterSeparator';
import { packageSeparatorGenerator } from '../common/PackageSeparator/PackageSeparatorGenerator';
import type { IConnectionHandler } from '../definition/ConnectionHandler/IConnectionHandler';
import type { IGroupFactory, IGroup } from '../definition/Group/IGroup';
import type { IPackageSeparatorGroup } from '../definition/PackageSeparator/IPackageSeparator';
import type { ITransformerGroup } from '../definition/Tranformer/ITransformer';
import type { P2PProviderAdapter, P2PProviderPlugin } from '../definitions';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

import { ConnectionHandler } from './ConnectionHandler/ConnectionHandler';
import type { Group } from './Group/Group';
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

export class P2PProviderNative implements P2PProviderPlugin {
  constructor(private P2PProviderAdapter: P2PProviderAdapter) {}

  async createGroupFactory(name: string): Promise<IGroupFactory> {
    return new GroupFactory(name, this.P2PProviderAdapter);
  }

  async createConnectionHandler(_options: {
    groups: IGroup[];
    addresses?: string[] | undefined;
  }): Promise<IConnectionHandler> {
    const { id } = await this.P2PProviderAdapter.createLibP2PInstance({
      groupIds: (_options.groups as Group[]).map(group => group.getId()),
    });

    return new ConnectionHandler(this.P2PProviderAdapter, id);
  }
  async ensurePackageSeparator(): Promise<IPackageSeparatorGroup> {
    return packageSeparator;
  }
  async ensureTransformer(): Promise<ITransformerGroup> {
    return transformer;
  }
}
