import { Event } from '../events/models/events/event';
import { LocalStorageCollection } from './local-storage-collection';

export class LocalStorageCollectionUpdateEvent implements Event {
    public readonly name: string = 'LocalStorageCollectionUpdateEvent';

    constructor(public readonly data: LocalStorageCollection<any>) {}
}
