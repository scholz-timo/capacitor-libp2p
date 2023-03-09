
import { IGroupFactory, IGroup } from './definition/Group/IGroup';
import { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';
import { IPackageSeparatorGroup } from './definition/PackageSeparator/IPackageSeparator';
import { ITransformerGroup } from './definition/Tranformer/ITransformer';


export interface P2PProviderPlugin {
  /**
   * Create a group factory.
   * Make sure to provide a name for the group factory.
   * 
   * Use this function to create groups.
   * 
   * @param name The name is used to IDENTIFY the group.
   */
  createGroupFactory(name: string): Promise<IGroupFactory>;
  
  /**
   * Creates a new connection handler using the provided groups and addresses.
   * Make sure to provide groups and addresses.
   *  
   * @param options A object containing the "groups" and (optionally) "addresses" to connect to.
   */
  createConnectionHandler(options: { groups: IGroup[], addresses?: string[] }): Promise<IConnectionHandler>;

  /**
   * A static object that contains different default implementations of the "package" separator.
   * 
   * Package separators are used to separate/join packages into group(s)
   */
  packageSeparator: IPackageSeparatorGroup;

  /**
   * A static object that contains different default implementations of the "transformer".
   * 
   * A transformer is used to transform data from/to UInt8Array
   */
  transformer: ITransformerGroup; 
}
