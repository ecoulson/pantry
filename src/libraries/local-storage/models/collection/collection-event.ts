import { Event } from '../../../events/models/events/event';
import { Identifiable } from '../../interfaces/identifiable';
import { Collection } from './collection';

export class CollectionEvent<T extends Identifiable> implements Event {
    public readonly name: string;
    public readonly collection: Collection<T>;

    constructor(collection: Collection<T>) {
        this.name = this.constructor.name;
        this.collection = collection;
    }
}
