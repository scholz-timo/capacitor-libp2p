export interface WithData<DataType = never> {
  readonly stream: Uint8Array | Exclude<DataType, never>;
}
