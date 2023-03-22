import type { Stream as P2PStream } from '@libp2p/interface-connection';
import { pipe } from 'it-pipe';
import type { Pushable } from 'it-pushable';
import { pushable } from 'it-pushable';

import { AStream } from '../../../common/ConnectionHandler/Stream/AStream';
import type { IVersionHandler } from '../../../definition/Group/VersionHandler/IVersionHandler';
import type { IPackageSeparator } from '../../../definition/PackageSeparator/IPackageSeparator';

export class Stream extends AStream {
  protected getPackageSeparator(): IPackageSeparator {
    return this.versionHandler.getPackageSeparator();
  }

  private pushStream: Pushable<Uint8Array>;

  constructor(
    private stream: P2PStream,
    protected readonly address: string,
    private versionHandler: IVersionHandler,
  ) {
    super();

    this.pushStream = pushable();

    pipe(this.stream, async source => {
      for await (const dataGroup of source) {
        for (const data of dataGroup) {
          this.onData(data);
        }
      }
    });

    pipe(this.pushStream, this.stream);
  }

  async send(data: Uint8Array): Promise<void> {
    this.pushStream.push(data);
  }

  async close(): Promise<void> {
    await this.stream.close();
  }
}
