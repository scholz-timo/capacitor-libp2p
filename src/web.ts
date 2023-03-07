import { WebPlugin } from '@capacitor/core';
import type { P2PProviderPlugin } from './definitions';
import { IGroupFactory, IGroup } from './definition/Group/IGroup';
import { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';

export class P2PProviderWeb extends WebPlugin implements P2PProviderPlugin {
  createConnectionHandler(_options: { groups: IGroup[]; addresses: string[]; }): Promise<IConnectionHandler> {
    throw new Error('Method not implemented.');
  }

  readonly packageSeparator = {
    delimiter: (_value: Uint8Array) => { throw new Error("Method not implemented.") }
  }
  readonly transformer = {
    string: {
      to: () => {throw new Error("Method not implemented.")},
      from: () => {throw new Error("Method not implemented.")}
    }
  }

  createGroupFactory(_options: { name: string; }): Promise<IGroupFactory> {
    throw new Error('Method not implemented.');
  }
}
