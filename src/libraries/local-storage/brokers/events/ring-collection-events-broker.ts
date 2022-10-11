import { Delegate } from '../../../../core/interfaces/delegate';
import { RingEventClient } from '../../../events/clients/ring-event-client';
import { Identifiable } from '../../interfaces/identifiable';
import { CollectionEvent } from '../../models/collection/collection-event';
import { CollectionEventsBroker } from './collection-events-broker';

export class RingCollectionEventsBroker<T extends Identifiable>
    implements CollectionEventsBroker<T>
{
    constructor(
        private readonly ringClient: RingEventClient<CollectionEvent<T>>
    ) {}

    listenToCollectionEvents(
        collectionEventHandler: Delegate<CollectionEvent<T>, Promise<void>>
    ): void {
        this.ringClient.registerEventHandler(
            CollectionEvent.name,
            collectionEventHandler
        );
    }

    async publishCollectionEventAsync(
        collectionEvent: CollectionEvent<T>
    ): Promise<void> {
        await this.ringClient.publishEvent(collectionEvent);
    }
}
