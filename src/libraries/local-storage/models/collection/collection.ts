import { Identifiable } from '../../interfaces/identifiable';
import { RecordExistsException } from './exceptions/record-exists-exception';
import { RecordNotFoundException } from './exceptions/record-not-found-exception';

export class Collection<T extends Identifiable> {
    private readonly collection: Map<string, T>;

    constructor() {
        this.collection = new Map();
    }

    selectAll(): T[] {
        const records: T[] = [];
        for (const value of this.collection.values()) {
            records.push(value);
        }
        return records;
    }

    selectById(id: string): T {
        this.assertRecordExists(id);
        return this.readRecord(id);
    }

    private readRecord(id: string) {
        return this.collection.get(id) as T;
    }

    private assertRecordExists(id: string) {
        if (!this.hasRecordWithId(id)) {
            throw new RecordNotFoundException(id);
        }
    }

    private hasRecordWithId(id: string): boolean {
        return this.collection.has(id);
    }

    insert(record: T): T {
        this.assertRecordDoesNotExist(record);
        this.writeRecord(record);
        return this.readRecord(record.id);
    }

    private assertRecordDoesNotExist(record: T) {
        if (this.hasRecordWithId(record.id)) {
            throw new RecordExistsException(record.id);
        }
    }

    private writeRecord(record: T) {
        this.collection.set(record.id, record);
    }

    delete(record: T): T {
        this.assertRecordExists(record.id);
        this.collection.delete(record.id);
        return record;
    }

    update(record: T): T {
        this.assertRecordExists(record.id);
        this.writeRecord(record);
        return this.readRecord(record.id);
    }
}
