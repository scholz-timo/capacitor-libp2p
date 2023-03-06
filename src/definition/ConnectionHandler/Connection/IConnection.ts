
export interface IConnection {
    readonly id: string;
    close(): Promise<void>;
}