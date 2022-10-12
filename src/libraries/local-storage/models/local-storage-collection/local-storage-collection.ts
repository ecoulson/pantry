export class LocalStorageCollection {
    constructor(
        public readonly applicationId: string,
        public readonly name: string,
        public readonly data: string
    ) {}
}
