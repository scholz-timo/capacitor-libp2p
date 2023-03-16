
import type {
  IStreamEventTypes,
  StreamEventMap,
} from '../../../definition/ConnectionHandler/Stream/IStream';
import { EventListener } from '../../../common/EventListener/EventListener';
import { P2PProviderAdapter } from '../../../definitions';
import { StreamEventType } from '../../../definition/ConnectionHandler/Stream/event/enum/StreamEventType';
import { AWebPackageSeparator } from '../../../web/PackageSeparator/AWebPackageSeparator';
import { uniq } from 'underscore';
import { IPackageSeparator } from '../../../definition/PackageSeparator/IPackageSeparator';

export class Stream extends EventListener<
  IStreamEventTypes,
  StreamEventMap,
  undefined,
  [IPackageSeparator]
> {

  private dataStorage: Map<AWebPackageSeparator, Uint8Array> = new Map();

  constructor(
    private id: number,
    private adapter: P2PProviderAdapter
  ) {
    super();

    this.adapter.createLibP2PStreamListener(({ id, data, event, address }) => {

      if (id !== this.id) {
        return;
      }

      const packageSeparators: AWebPackageSeparator[] = uniq(Object.values(this.eventListeners).flat().map((listener) => listener.parameters[0]));

      if ((event & StreamEventType.data) === StreamEventType.data) {
        packageSeparators.map(async (packageSeparator) => {
          this.dataStorage.set(packageSeparator, this.dataStorage.get(packageSeparator) ?? new Uint8Array(0));
          const result = packageSeparator.separate(
            this.dataStorage.get(packageSeparator)!,
            data.bytes
          );
  
          while (result.length > 1) {
            // TODO: Check for errors and handle?.
            this.basicEmit(StreamEventType.data, [{
              source: {
                address,
              },
              stream: result.shift()!,
              type: StreamEventType.data,
              partial: false
            }], [packageSeparator]);
          }
  
          this.dataStorage.set(packageSeparator, result[0]);
        });
      }
      
      if ((event & StreamEventType.closed) === StreamEventType.closed) {
        this.basicEmit(StreamEventType.closed, [{
          source: {
            address,
          },
          type: StreamEventType.closed
        }], [undefined]);
      }

      if ((event & StreamEventType.error) === StreamEventType.error) {
        this.basicEmit(StreamEventType.error, [{
          source: {
            address
          },
          type: StreamEventType.error
        }], [undefined]);
      }
    });
  }

  async close(): Promise<void> {
    await this.adapter.closeStream({ id: this.id });
  }
}