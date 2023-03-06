
import { IGroupFactory, IGroup } from './definition/Group/IGroup';

export interface P2PProviderPlugin {
  createGroupFactory(options: { name: string }): Promise<IGroupFactory>;
  createConnectionHandler(options: { groups: IGroup[] }): Promise<{ value: string }>;
}
