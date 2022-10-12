import { anyOfClass, capture, instance, mock, reset, verify } from 'ts-mockito';
import { RingCollectionEventsBroker } from '../../../brokers/events/ring-collection-events-broker';
import { Collection } from '../../../models/collection/collection';
import { CollectionEvent } from '../../../models/collection/collection-event';
import { LocalStorageCollectionEventService } from './local-storage-collection-event-service';

describe('Local Storage Collection Event Service Test Suite', () => {
    const mockedBroker = mock(RingCollectionEventsBroker);
    const service = new LocalStorageCollectionEventService(
        instance(mockedBroker)
    );

    beforeEach(() => {
        reset(mockedBroker);
    });

    describe('publishCollectionEventAsync', () => {
        test('Should publish a collection event', async () => {
            const collection = new Collection();
            const expectedEvent = new CollectionEvent(collection);

            await service.publishCollectionEventAsync(collection);

            verify(
                mockedBroker.publishCollectionEventAsync(
                    anyOfClass(CollectionEvent)
                )
            ).once();
            const [actualEvent] = capture(
                mockedBroker.publishCollectionEventAsync
            ).last();
            expect(actualEvent).toEqual(expectedEvent);
        });

        test('Should throw a validation exception when the collection is null')
    });
});
