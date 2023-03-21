import { Concat, Drop } from "typescript-tuple";

export type ReverseMap<T extends Record<keyof T, any>> = {
    [V in T[keyof T]]: {
        [K in keyof T]: T[K] extends V ? K : never;
    }[keyof T];
};

export type GetTypesForEntry<T, Entry> = Exclude<{
    [Key in keyof Entry]?: Key extends T ? Entry[Key] : never;
}[keyof Entry], undefined | never>;

// Start union to array.

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;
  
  type UnionToOvlds<U> = UnionToIntersection<
    U extends any ? (f: U) => void : never
  >;
  
  type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;
  
  type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;
  
export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
    ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
    : [T, ...A];

// End union to array.

export type BasicEventList = Record<number, string>;
export type BasicTypeRecord<EventList extends BasicEventList> = EventRecord<EventList>;
export type BasicDefaultEventCallbackParams = any[]|undefined;

export type EventRecord<EventList> = {
  [k in keyof EventList]?: [...any];
};

export type EventParameters<
  EventList extends BasicEventList, 
  Event extends keyof EventList, 
  TypeRecord extends BasicTypeRecord<EventList>, 
  DefaultEventCallbackParams extends BasicDefaultEventCallbackParams
> = 
  DefaultEventCallbackParams extends any[] ? 
    GetTypesForEntry<Event, TypeRecord> extends any[] ?
      Concat<Exclude<DefaultEventCallbackParams, undefined>, Exclude<GetTypesForEntry<Event, TypeRecord>, undefined>> :
   DefaultEventCallbackParams :
   GetTypesForEntry<Event, TypeRecord> extends any[] ? 
      GetTypesForEntry<Event, TypeRecord> :
  [];

export type AllToUndefined<T extends any[]> = T['length'] extends 1 ? [T[0]|undefined] : [T[0]|undefined, ...AllToUndefined<Drop<T, 1>>];

