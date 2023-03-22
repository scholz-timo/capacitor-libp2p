import { expectNotType, expectType } from 'tsd';

import type {
  EventParameters,
  GetTypesForEntry,
  ReverseMap,
  UnionToArray,
} from '../../../src/definition/EventListener/types';

const callbackGenerator = <T>(): T => {
  return undefined as unknown as any;
};

enum ExampleEnum {
  HELLO = 0,
  WORLD = 2,
}

type ReversedExampleEnum = ReverseMap<typeof ExampleEnum>;
expectType<{
  [ExampleEnum.HELLO]: 'HELLO';
  [ExampleEnum.WORLD]: 'WORLD';
}>(callbackGenerator<ReversedExampleEnum>());

type AllNumberedEntryTypes = GetTypesForEntry<number, ReversedExampleEnum>;
expectType<'HELLO' | 'WORLD'>(callbackGenerator<AllNumberedEntryTypes>());

type ForExampleEnumEntryTypes = GetTypesForEntry<
  ExampleEnum.HELLO,
  ReversedExampleEnum
>;
expectType<'HELLO'>(callbackGenerator<ForExampleEnumEntryTypes>());
expectNotType<'WORLD'>(callbackGenerator<ForExampleEnumEntryTypes>());

type UnionType = 'hello' | 'world' | 'example';
type UnionTypeArray = UnionToArray<UnionType>;
expectType<['example', 'hello', 'world']>(callbackGenerator<UnionTypeArray>());

type MyTypeGroup = {
  [ExampleEnum.HELLO]: ['test1'];
  [ExampleEnum.WORLD]: ['test2'];
};

expectType<['test2']>(
  callbackGenerator<
    EventParameters<
      ReversedExampleEnum,
      ExampleEnum.HELLO,
      MyTypeGroup,
      undefined
    >
  >(),
);
