import { CollectionStorageBroker } from '../../../brokers/storage/collection-storage-broker';
import { Identifiable } from '../../../interfaces/identifiable';

export class LocalStorageCollectionService<T extends Identifiable> {
    constructor(
        private readonly collectionBroker: CollectionStorageBroker<T>
    ) {}

    list(): T[] {
        throw new Error();
    }

    findById(id: string): T {
        throw new Error();
    }

    create(record: T): T {
        throw new Error();
    }

    delete(record: T): T {
        throw new Error();
    }

    update(record: T): T {
        throw new Error();
    }
}
