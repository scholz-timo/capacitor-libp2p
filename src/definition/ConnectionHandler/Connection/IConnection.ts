
export interface IConnection {
    readonly id: string;
    readonly address: string;
    close(): Promise<void>;
}