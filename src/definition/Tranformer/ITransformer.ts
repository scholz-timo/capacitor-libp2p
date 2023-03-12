
export interface ITransformer<T> {
    toUInt8(value: T): Uint8Array;
    fromUInt8(value: Uint8Array): T;
}

export interface ITransformerGroup {
    string: ITransformer<string>;
}
