import { CollectionStorageBroker } from '../../../brokers/storage/collection-storage-broker';
import { Identifiable } from '../../../interfaces/identifiable';

export class LocalStorageCollectionService<T extends Identifiable> {
    constructor(
        private readonly collectionBroker: CollectionStorageBroker<T>
    ) {}

    list(): T[] {}

    findById(id: string): T {}

    create(record: T): T {}

    delete(record: T): T {}

    update(record: T): T {}
}
