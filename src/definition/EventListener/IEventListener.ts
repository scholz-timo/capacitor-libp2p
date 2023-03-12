import { Drop, Concat, LongestTuple, CompareLength, Append } from 'typescript-tuple';

export type EventRecord<EventList> = {
    [k in keyof EventList]?: [...any];
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
  ) => void
    ? I
    : never;

type UnionToOvlds<U> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

type GetTypesForEntry<T, Entry> = Exclude<{
    [Key in keyof Entry]?: Key extends T ? Entry[Key] : never
}[keyof Entry], undefined>;

export type EventParameters<EventList, Event extends keyof EventList, TypeRecord extends EventRecord<EventList>, DefaultEventCallbackParams extends Array<any> = []> = 
    Event extends keyof TypeRecord ? 
        GetTypesForEntry<Event, TypeRecord> extends any[] ? Concat<DefaultEventCallbackParams, Exclude<TypeRecord[Event], undefined>> : DefaultEventCallbackParams 
    : DefaultEventCallbackParams;

export type AllToUndefined<Tuple extends any[]> = CompareLength<Tuple, []> extends 'equal' ? [Tuple[0]|undefined, ...AllToUndefined<Drop<Tuple, 1>>] : [];
type NormalizeLength<Tuple extends any[], ourLongestTuple extends any[]> = CompareLength<Tuple, ourLongestTuple> extends 'equal' ? Tuple : Append<Tuple, undefined>;

type __NormalizeEventParameters<Tuple extends any[][], ourLongestTuple extends any[]> = 
    Tuple['length'] extends 1  ?
        NormalizeLength<Tuple[0], ourLongestTuple> :
    __NormalizeEventParameters<Drop<Tuple, 1>, ourLongestTuple> | NormalizeLength<Tuple[0], ourLongestTuple>

export type NormalizeEventParameters<Tuple extends any[]> = EnsureArrayType<Tuple['length'] extends 0 ? Tuple : 
    UnionToArray<Tuple> extends [any[], ...any[]] ? 
        __NormalizeEventParameters<Exclude<UnionToArray<Tuple>, LongestTuple<UnionToArray<Tuple>>>, LongestTuple<UnionToArray<Tuple>>>:
    Tuple
>;

type EnsureArrayType<PotentialArrayType> = PotentialArrayType extends any[] ? PotentialArrayType : [];


export type ReverseMap<T extends Record<keyof T, any>> = {
    [V in T[keyof T]]: {
        [K in keyof T]: T[K] extends V ? K : never;
    }[keyof T];
}

export type EventStructure<Event> = {
    type: Event;
}

export interface IEventListener<
    EventList extends Record<number, any>, 
    TypeRecord extends EventRecord<EventList> = {}, 
    DefaultEventCallbackParams extends any[] = [], 
    SpecialOnArgs extends any[] = []
> {
    on <Event extends keyof EventList>(event: Event, callback: (...args: NormalizeEventParameters<EventParameters<EventList, Event, TypeRecord, DefaultEventCallbackParams>>) => any, ...args: SpecialOnArgs): this;
    off<Event extends keyof EventList>(event: Event, callback: (...args: NormalizeEventParameters<EventParameters<EventList, Event, TypeRecord, DefaultEventCallbackParams>>) => any, ...args: AllToUndefined<SpecialOnArgs>): this;
}