import type { IConnectionHandler } from '../definition/ConnectionHandler/IConnectionHandler';
import type { IGroupFactory, IGroup } from '../definition/Group/IGroup';
import type { IPackageSeparatorGroup } from '../definition/PackageSeparator/IPackageSeparator';
import type { ITransformerGroup } from '../definition/Tranformer/ITransformer';
import type { P2PProviderAdapter, P2PProviderPlugin } from '../definitions';

import { ConnectionHandler } from './ConnectionHandler/ConnectionHandler';
import type { Group } from './Group/Group';
import { GroupFactory } from './Group/GroupFactory';

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
  ensurePackageSeparator(): Promise<IPackageSeparatorGroup> {
    throw new Error('Method not implemented.');
  }
  ensureTransformer(): Promise<ITransformerGroup> {
    throw new Error('Method not implemented.');
  }
}
