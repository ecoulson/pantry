import { LocalStorageCollection } from '../../local-storage/local-storage-collection';
import { Identifiable } from '../models/identifiable';
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