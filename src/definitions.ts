
import { IGroupFactory, IGroup } from './definition/Group/IGroup';
import { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';
import { IPackageSeparatorGroup } from './definition/PackageSeparator/IPackageSeparator';
import { ITransformerGroup } from './definition/Tranformer/ITransformer';


export interface P2PProviderPlugin {
  createGroupFactory(options: { name: string }): Promise<IGroupFactory>;
  createConnectionHandler(options: { groups: IGroup[], addresses: string[] }): Promise<IConnectionHandler>;
  packageSeparator: IPackageSeparatorGroup;
  transformer: ITransformerGroup; 
}
