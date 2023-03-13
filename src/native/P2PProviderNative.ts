import type { IConnectionHandler } from '../definition/ConnectionHandler/IConnectionHandler';
import type { IGroupFactory, IGroup } from '../definition/Group/IGroup';
import type { IPackageSeparatorGroup } from '../definition/PackageSeparator/IPackageSeparator';
import type { ITransformerGroup } from '../definition/Tranformer/ITransformer';
import type { P2PProviderAdapter, P2PProviderPlugin } from '../definitions';

export class P2PProviderNative implements P2PProviderPlugin {
  constructor(private P2PProviderAdapter: P2PProviderAdapter) {}

  createGroupFactory(_name: string): Promise<IGroupFactory> {
    throw new Error('Method not implemented.');
  }
  createConnectionHandler(_options: {
    groups: IGroup[];
    addresses?: string[] | undefined;
  }): Promise<IConnectionHandler> {
    throw new Error('Method not implemented.');
  }
  ensurePackageSeparator(): Promise<IPackageSeparatorGroup> {
    throw new Error('Method not implemented.');
  }
  ensureTransformer(): Promise<ITransformerGroup> {
    throw new Error('Method not implemented.');
  }
}
