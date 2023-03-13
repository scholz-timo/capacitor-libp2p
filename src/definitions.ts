import type { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';
import type { IGroupFactory, IGroup } from './definition/Group/IGroup';
import type { IPackageSeparatorGroup } from './definition/PackageSeparator/IPackageSeparator';
import type { ITransformerGroup } from './definition/Tranformer/ITransformer';

export interface P2PProviderAdapter {
  createLibP2PInstance(value: { groupIds: number[], addresses?: string[] }): Promise<{ id: number }>;
  destroyLibP2PInstance(): Promise<void>;


  createGroup(value: { name: string, versionHandler: string[] }): Promise<{ id: string }>;

  createVersionHandler(value: { version: string }): Promise<{ id: string }>;
  sendVersionHandlerResponse(value: { id: string, responseType: any }): Promise<void>;
  onVersionHandlerUpdate(versionHandlerUpdateCallback: (value: { id: string, data: any }) => any): Promise<any> & any;

  createLibP2PMessageListener(messageHandlerCallback: (value: { id: string, data: any}) => any): Promise<any> & any;

}


/**
 * The P2P-Provider plugin interface.
 */
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
  createConnectionHandler(options: {
    groups: IGroup[];
    addresses?: string[];
  }): Promise<IConnectionHandler>;

  /**
   * A static object that contains different default implementations of the "package" separator.
   *
   * Package separators are used to separate/join packages into group(s)
   */
  ensurePackageSeparator(): Promise<IPackageSeparatorGroup>;

  /**
   * A static object that contains different default implementations of the "transformer".
   *
   * A transformer is used to transform data from/to UInt8Array
   */
  ensureTransformer(): Promise<ITransformerGroup>;
}
