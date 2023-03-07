import { WebPlugin } from '@capacitor/core';
import type { P2PProviderPlugin } from './definitions';
import { IGroupFactory, IGroup } from './definition/Group/IGroup';
import { IConnectionHandler } from './definition/ConnectionHandler/IConnectionHandler';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';

export class P2PProviderWeb extends WebPlugin implements P2PProviderPlugin {
  createConnectionHandler(_options: { groups: IGroup[]; addresses: string[]; }): Promise<IConnectionHandler> {
    throw new Error('Method not implemented.');
  }

  readonly packageSeparator = {
    delimiter: (_value: Uint8Array) => { throw new Error("Method not implemented.") }
  }
  readonly transformer = {
    string: {
      to: (value: string) => uint8ArrayFromString(value),
      from: (value: Uint8Array) => uint8ArrayToString(value)
    }
  }

  createGroupFactory(_options: { name: string; }): Promise<IGroupFactory> {
    throw new Error('Method not implemented.');
  }
}
