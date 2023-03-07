
import { IGroupFactory, IGroup } from './definition/Group/IGroup';
import { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';

export interface P2PProviderPlugin {
  createGroupFactory(options: { name: string }): Promise<IGroupFactory>;
  createConnectionHandler(options: { groups: IGroup[], addresses: string[] }): Promise<IConnectionHandler>;
}
