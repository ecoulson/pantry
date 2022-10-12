import { Delegate } from '../../../../../core/interfaces/delegate';
import { CollectionEventsBroker } from '../../../brokers/events/collection-events-broker';
import { Identifiable } from '../../../interfaces/identifiable';
import { Collection } from '../../../models/collection/collection';

export class LocalStorageCollectionEventService<T extends Identifiable> {
    constructor(
        private readonly collectionEventBroker: CollectionEventsBroker<T>
    ) {}

    publishCollectionEventAsync(collection: Collection<T>): Promise<void> {}

    listenToCollectionEvent(
        collectionHandler: Delegate<Collection<T>, Promise<void>>
    ): void {}
}
