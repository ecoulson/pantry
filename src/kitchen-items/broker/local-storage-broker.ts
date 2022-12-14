import { LocalStorageCollection } from '../../libraries/local-storage/local-storage-collection';
import { Identifiable } from '../../libraries/local-storage/interfaces/identifiable';
import { StorageBroker } from './storage-broker';

export class LocalStorageBroker<T extends Identifiable>
    implements StorageBroker
{
    constructor(private readonly collection: LocalStorageCollection<T>) {}

    findAll(): T[] {
        return this.collection.find();
    }

    add(record: T): T {
        return this.collection.add(record);
    }
}
