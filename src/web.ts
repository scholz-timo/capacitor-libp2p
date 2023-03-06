import { WebPlugin } from '@capacitor/core';
import type { P2PProviderPlugin } from './definitions';
import { IGroupFactory, IGroup } from './definition/Group/IGroup';

export class P2PProviderWeb extends WebPlugin implements P2PProviderPlugin {
  createGroupFactory(_options: { name: string; }): Promise<IGroupFactory> {
    throw new Error('Method not implemented.');
  }
  createConnectionHandler(_options: { groups: IGroup[]; }): Promise<{ value: string; }> {
    throw new Error('Method not implemented.');
  }
}
