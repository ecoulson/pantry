import { Delegate } from '../../../../core/interfaces/delegate';
import { Identifiable } from '../../interfaces/identifiable';
import { CollectionEvent } from '../../models/collection/collection-event';

export interface CollectionEventsBroker<T extends Identifiable> {
    listenToCollectionEvents(
        collectionEventHandler: Delegate<CollectionEvent<T>, Promise<void>>
    ): void;

    publishCollectionEventAsync(
        collectionEvent: CollectionEvent<T>
    ): Promise<void>;
}
