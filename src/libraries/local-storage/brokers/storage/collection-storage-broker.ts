import { Identifiable } from '../../interfaces/identifiable';

export interface CollectionStorageBroker<T extends Identifiable> {
    selectAll(): T[];
    selectById(id: string): T;
    insert(record: T): T;
    delete(record: T): T;
    update(record: T): T;
}
