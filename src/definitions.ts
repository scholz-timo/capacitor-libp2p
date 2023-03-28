import { Plugin } from '@capacitor/core';
import type { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';
import type { StreamEventType } from './definition/ConnectionHandler/Stream/event/enum/StreamEventType';
import type { IGroupFactory, IGroup } from './definition/Group/IGroup';
import type { IPackageSeparatorGroup } from './definition/PackageSeparator/IPackageSeparator';
import type { ProtocolRequestHandlerResponse } from './definition/Protocol/enum/ProtocolRequestHandlerResponse';
import type { ITransformerGroup } from './definition/Tranformer/ITransformer';

type P2PProviderAdapterStreamListenerCallback = (value: {
  event: StreamEventType;
  data: any;
  id: string;
}) => any;

/**
 * The P2PProviderAdapter.
 *
 * This is the internal struct, that is used for the P2PProvider plugin implementation.
 * This structure is only implemented for (android/ios).
 * (These are the bindings)
 */
export interface P2PProviderAdapter extends Plugin {
  /**
   * Creates a group and stores it into the plugin.
   *
   * @param value
   */
  createGroup(value: {
    name: string;
    versionHandler: string[];
  }): Promise<{ id: string }>;

  /**
   * will open a new connection or return a existing connection.
   *
   * @param value.address The address to connect to. Is a multi-address.
   * @param value.id The id of the libp2p(core) instance.
   * @returns The id of the connection.
   */
  dial(value: { address: string; id: string }): Promise<{ id: string }>;

  /**
   * Will close a connection, if present.
   *
   * @param value.address The address to close. Is a multi-address.
   */
  hangUp(value: { address: string; id: string }): Promise<void>;

  /**
   * Will close a stream, if present.
   *
   * @param value.id The id of the libp2p(core) instance.
   * @param value.streamId The id of the stream.
   */
  closeStream(value: { id: string; streamId: string }): Promise<void>;

  /**
   * Returns my connections.
   *
   * Returns an object of connections(consisting of address(multi-address) and id)
   *
   * @param value.id The id of the core(LibP2P) instance.
   *
   * @returns connections[].address
   * @returns connections[].id
   */
  getMyConnections(value: {
    id: string;
  }): Promise<{ addresses: string[] }>;

  /**
   * Return my own addresses.
   *
   * @param value.id The id of the core(LibP2P) instance.
   */
  getAddresses(value: { id: string }): Promise<{ addresses: string[] }>;

  /**
   * Creates an new version handler
   *
   * @param value.version The version of the handler. (Example "0.0.0")
   * @returns a version handler id.
   */
  createVersionHandler(value: { version: string }): Promise<{ id: string }>;

  /**
   * Creates a core(LibP2P) instance.
   *
   * @param value.groupIds An array consisting of created groups.
   * @param value.addresses The addresses to connect to.
   *
   * @returns The id of the core(LibP2P) instance.
   */
  createLibP2PInstance(value: {
    groupIds: string[];
  }): Promise<{ id: string }>;

  /**
   * Destroys a core(LibP2P) instance.
   *
   * @param value.id The id.
   */
  destroyLibP2PInstance(value: { id: string }): Promise<void>;

  /**
   * Starts accepting/sending connections.
   *
   * @param value.id The id of the core(LibP2P) instance to start.
   */
  startP2PInstance(value: { id: string }): Promise<void>;

  /**
   * Stops accepting/sending connections.
   *
   * @param value.id The id of the core(LibP2P) instance to start.
   */
  stopP2PInstance(value: { id: string }): Promise<void>;

  /**
   * Creates a new stream for a given core(LibP2P) instance.
   *
   * @param value.id The id of the core(LibP2P) instance.
   * @param value.connectionId The id of the given connection.
   * @param value.groupId The id of the given group.
   * @param value.versionHandlerId The id of the given version handler.
   *
   * @returns A new or an existing stream id.
   */
  createLibP2PStream(value: {
    id: string;
    address: string;
    groupId: string;
    versionHandlerId: string;
  }): Promise<{ id: string }>;

  /**
   * Sends data to the given stream.
   * 
   * 
   * @param value.id The id of the core(LibP2P) instance.
   * @param value.streamId The id of the stream.
   * @param value.data The data that should be sent.
   */
  sendDataToStream(value: { id: string; streamId: string; data: Uint8Array }): Promise<void>;

  /**
   * Destroys a given stream.
   *
   * @param value.id A valid stream id.
   */
  destroyLibP2PStream(value: { id: string; streamId: string }): Promise<void>;

  /**
   * Will emit an update to the callback, when a inbound connection tries to access the given protocol.
   *
   * Needs to be registered for every versionHandler.
   * Needs to call `sendVersionHandlerResponse` for every call to it.
   *
   * @param versionHandlerUpdateCallback.value.id The
   * @param versionHandlerUpdateCallback.value.updateId
   * @param versionHandlerUpdateCallback.value.data
   */
  onVersionHandlerUpdate(
    versionHandlerUpdateCallback: (value: {
      id: string;
      updateId: string;
      data: any;
    }) => any,
  ): Promise<any> & any;

  /**
   * Needs to be called for every event that was emitted by onVersionHandlerUpdate.
   *
   * @param value.id The version handler update callback updateId
   * @param value.responseType The given response.
   */
  sendVersionHandlerResponse(value: {
    id: string;
    requestId: string;
    responseType: ProtocolRequestHandlerResponse;
    data?: Uint8Array;
  }): Promise<void>;

  /**
   * Will emit an update to the callback, when a inbound connection send data to the client(e.G.) a response.
   *
   * @param messageHandlerCallback
   */
  createLibP2PStreamListener(
    messageHandlerCallback: P2PProviderAdapterStreamListenerCallback,
  ): Promise<any> & any;
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
