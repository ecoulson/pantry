import { Identifiable } from './interfaces/identifiable';
import { LocalRingEventClient } from '../events/clients/local-ring-event-client';
import { RingEventClient } from '../events/clients/ring-event-client';
import { LocalStorageCollectionUpdateEvent } from './local-storage-collection-update-event';

export class LocalStorageCollection<T extends Identifiable> {
    constructor(
        public readonly name: string,
        private readonly collection: Map<string, T>,
        private readonly ringClient: RingEventClient<LocalStorageCollectionUpdateEvent>
    ) {}

    public static fromJSON<T extends Identifiable>(
        name: string,
        serializedCollection: string
    ) {
        return new LocalStorageCollection<T>(
            name,
            new Map(Object.entries(JSON.parse(serializedCollection))),
            new LocalRingEventClient()
        );
    }

    serializeToJSON() {
        const records = this.find();
        return JSON.stringify(
            records.reduce<Record<string, any>>((json, currentRecord) => {
                json[currentRecord.id] = currentRecord;
                return json;
            }, {})
        );
    }

    find(): T[] {
        const records: T[] = [];
        for (const record of this.collection.values()) {
            records.push(record);
        }
        return records;
    }

    findById(id: string): T {
        if (!this.collection.has(id)) {
            throw new Error(`No record with id ${id}`);
        }
        return this.collection.get(id) as T;
    }

    add(record: T): T {
        if (this.collection.has(record.id)) {
            throw new Error(`Record with id ${record.id} already exists`);
        }
        this.collection.set(record.id, record);
        this.ringClient.publishEvent(
            new LocalStorageCollectionUpdateEvent(this)
        );
        return record;
    }

    update(record: T): T {
        if (!this.collection.has(record.id)) {
            throw new Error(`Record with id ${record.id} does not exist`);
        }
        this.collection.set(record.id, record);
        this.ringClient.publishEvent(
            new LocalStorageCollectionUpdateEvent(this)
        );
        return record;
    }

    remove(record: T): T {
        if (!this.collection.has(record.id)) {
            throw new Error(`Record with id ${record.id} does not exist`);
        }
        this.collection.delete(record.id);
        this.ringClient.publishEvent(
            new LocalStorageCollectionUpdateEvent(this)
        );
        return record;
    }
}
