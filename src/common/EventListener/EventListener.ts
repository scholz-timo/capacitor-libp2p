import { isEqual } from 'underscore';

import type {
  AllToUndefined,
  BasicTypeRecord,
  EventParameters,
  IEventListener,
} from '../../definition/EventListener/IEventListener';

export class EventListener<
  EventList extends Record<number, any>,
  /* eslint-disable */
  TypeRecord extends BasicTypeRecord<EventList> = {},
  /* eslint-enable */
  DefaultEventCallbackParams extends (any[])|undefined = undefined,
  SpecialOnArgs extends (any[])|undefined = undefined,
> implements
    IEventListener<
      EventList,
      TypeRecord,
      DefaultEventCallbackParams,
      SpecialOnArgs
    >
{
  constructor(
    protected eventListeners: Record<
      keyof EventList,
      {
        deleted: boolean;
        callback: (...args: any) => any;
        parameters: any[];
      }[]
    > = {} as any,
  ) {}

  protected async basicEmit<T extends keyof EventList>(
    event: T,
    callbackParams: EventParameters<EventList, T, TypeRecord, DefaultEventCallbackParams>,
    otherArgs: SpecialOnArgs extends any[] ? AllToUndefined<Exclude<SpecialOnArgs, undefined>> : [],
  ): Promise<Array<{isError: false, data: any } | { isError: true, error: any }>> {
    const events = Object.entries(this.eventListeners)
      .filter(([key]) => (Number(event) & Number(key)) === Number(key))
      .map(([, events]) => events)
      .flat();

    const eventsToCall = events
      .filter(event => !event.deleted)
      .filter(event => {
        if (otherArgs.length === 0) {
          return true;
        }

        return otherArgs.map((otherArg, index) => {
          if (otherArg === undefined) {
            return false;
          }

          return !isEqual(otherArg, event.parameters?.[index]);
        }).filter(Boolean).length === 0;
      });

    const responses: Array<{isError: false, data: any } | { isError: true, error: any }> = [];
    for (const event of eventsToCall) {
      try {
        responses.push({
          isError: false,
          data: await event.callback(...callbackParams),
        });
      } catch (error) {
        responses.push({
          isError: true,
          error,
        });
      }
    }

    return responses;
  }

  on(
    event: keyof EventList,
    callback: (...args: any) => any,
    ...otherArgs: any[]
  ): this {
    this.eventListeners[event] ||= [];
    this.eventListeners[event].push({
      deleted: false,
      callback,
      parameters: otherArgs,
    });
    return this;
  }

  off(
    event: keyof EventList,
    callback: (...args: any) => any,
    ...otherArgs: any[]
  ): this {
    this.eventListeners[event]
      .filter(eventListener => {
        return eventListener.callback === callback;
      })
      .filter(eventListener => {
        return !eventListener.deleted;
      })
      .filter(eventListener => {
        if (otherArgs.length === 0) {
          return true;
        }

        return isEqual(
          eventListener.parameters.copyWithin(0, otherArgs.length),
          otherArgs,
        );
      })
      .forEach(eventListener => {
        eventListener.deleted = true;
      });
    return this;
  }
}
