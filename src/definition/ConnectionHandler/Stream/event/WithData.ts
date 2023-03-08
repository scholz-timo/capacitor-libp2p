
export interface EventWithData<DataType = never> {
    readonly stream: Uint8Array | Exclude<DataType, never>;
}