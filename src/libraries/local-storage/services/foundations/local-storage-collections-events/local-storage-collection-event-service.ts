import { Delegate } from '../../../../../core/interfaces/delegate';
import { CollectionEventsBroker } from '../../../brokers/events/collection-events-broker';
import { Identifiable } from '../../../interfaces/identifiable';
import { Collection } from '../../../models/collection/collection';
import { CollectionEvent } from '../../../models/collection/collection-event';

export class LocalStorageCollectionEventService<T extends Identifiable> {
    constructor(
        private readonly collectionEventBroker: CollectionEventsBroker<T>
    ) {}

    async publishCollectionEventAsync(
        collection: Collection<T>
    ): Promise<void> {
        await this.collectionEventBroker.publishCollectionEventAsync(
            new CollectionEvent(collection)
        );
    }

    listenToCollectionEvent(
        collectionHandler: Delegate<Collection<T>, Promise<void>>
    ): void {}
}
