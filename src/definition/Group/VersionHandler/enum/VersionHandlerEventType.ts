
export enum VersionHandlerEventType {
    ready  = 0b1000,
    data   = 0b0100,
    closed = 0b0010,
    error  = 0b0001,
    all    = 0b1111,
}
