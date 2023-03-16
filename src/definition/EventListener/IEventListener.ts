import type { AllToUndefined, BasicDefaultEventCallbackParams, BasicEventList, BasicTypeRecord, EventParameters, ReverseMap } from "./types";

export {
  AllToUndefined,
  BasicDefaultEventCallbackParams,
  BasicEventList,
  BasicTypeRecord,
  EventParameters,
  ReverseMap
}

export type EventStructure<Event> = {
  type: Event;
};

export interface IEventListener<
  EventList extends BasicEventList,
  /* eslint-disable */
  TypeRecord extends BasicTypeRecord<EventList>,
  /* eslint-enable */
  DefaultEventCallbackParams extends BasicDefaultEventCallbackParams = undefined,
  SpecialOnArgs extends (any[])|undefined = undefined,
> {
  on<Event extends keyof EventList>(
    event: Event,
    callback: (
      ...args: EventParameters<
          EventList,
          Event,
          TypeRecord,
          DefaultEventCallbackParams
        >
    ) => any,
    ...args: SpecialOnArgs extends undefined ? [] : SpecialOnArgs
  ): this;
  off<Event extends keyof EventList>(
    event: Event,
    callback: (
      ...args: EventParameters<
          EventList,
          Event,
          TypeRecord,
          DefaultEventCallbackParams
      >
    ) => any,
    ...args: SpecialOnArgs extends any[] ? AllToUndefined<Exclude<SpecialOnArgs, undefined>> : []
  ): this;
}
