import { Event } from '../events/event';
import { LocalStorageCollection } from './local-storage-collection';

export class LocalStorageCollectionUpdateEvent
    implements Event<LocalStorageCollection<any>>
{
    public readonly type: string = 'LocalStorageCollectionUpdateEvent';

    constructor(public readonly data: LocalStorageCollection<any>) {}
}
