
export interface IPackageSeparator {
    
}

export interface IPackageSeparatorGroup {
    delimiter: (value: Uint8Array) => IPackageSeparator
}

