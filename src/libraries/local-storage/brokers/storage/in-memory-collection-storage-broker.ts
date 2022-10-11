import { Identifiable } from '../../interfaces/identifiable';
import { Collection } from '../../models/collection/collection';
import { CollectionStorageBroker } from './collection-storage-broker';

export class InMemoryCollectionStorageBroker<T extends Identifiable>
    implements CollectionStorageBroker<T>
{
    private readonly collection: Collection<T>;

    constructor() {
        this.collection = new Collection();
    }

    selectAll(): T[] {
        return this.collection.selectAll();
    }

    selectById(id: string): T {
        return this.collection.selectById(id);
    }

    insert(record: T): T {
        return this.collection.insert(record);
    }

    delete(record: T): T {
        return this.collection.delete(record);
    }

    update(record: T): T {
        return this.collection.update(record);
    }
}
