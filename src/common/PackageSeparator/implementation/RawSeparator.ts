import { IPackageSeparator } from "../../../definition/PackageSeparator/IPackageSeparator";

export class RawSeparator implements IPackageSeparator {
    separate(_previous: Uint8Array, current: Uint8Array): Uint8Array[] {
        return [current, new Uint8Array()];
    }
    formatMessage(message: Uint8Array): Uint8Array {
        return message;
    }

}
