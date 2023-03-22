import { AStream } from '../../../common/ConnectionHandler/Stream/AStream';
import { StreamEventType } from '../../../definition/ConnectionHandler/Stream/event/enum/StreamEventType';
import type { IPackageSeparator } from '../../../definition/PackageSeparator/IPackageSeparator';
import type { P2PProviderAdapter } from '../../../definitions';

export class Stream extends AStream {
  protected getPackageSeparator(): IPackageSeparator {
    throw new Error('Method not implemented.');
  }

  constructor(
    private id: number,
    private adapter: P2PProviderAdapter,
    protected readonly address: string,
  ) {
    super();

    this.adapter.createLibP2PStreamListener(({ id, data, event }) => {
      if (id !== this.id) {
        return;
      }

      if ((event & StreamEventType.data) === StreamEventType.data) {
        this.onData(data);
      }

      if ((event & StreamEventType.closed) === StreamEventType.closed) {
        this.onClosed();
      }

      if ((event & StreamEventType.error) === StreamEventType.error) {
        this.onError();
      }
    });
  }

  public async send(data: Uint8Array): Promise<void> {
    await this.adapter.sendDataToStream({ id: this.id, data });
  }

  async close(): Promise<void> {
    await this.adapter.closeStream({ id: this.id });
  }
}
