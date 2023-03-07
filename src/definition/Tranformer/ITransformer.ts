
export interface ITransformer<T> {
    to(value: T): Uint8Array;
    from(value: Uint8Array): T;
}

export interface ITransformerGroup {
    string: ITransformer<string>;
}
