import { isNil } from '../../core/conditions/is-nil';
import { Identifiable } from './interfaces/identifiable';
import { LocalRingEventClient } from '../events/clients/local-ring-event-client';
import { RingEventClient } from '../events/clients/ring-event-client';
import { LocalStorageCollection } from './local-storage-collection';
import { LocalStorageCollectionUpdateEvent } from './local-storage-collection-update-event';

export class LocalStorageClient {
    private static readonly ApplicationId = 'pantry';
    private static readonly EmptyCollection = '{}';

    constructor(
        private readonly applicationIdentifier: string,
        ringClient: RingEventClient<LocalStorageCollectionUpdateEvent>
    ) {
        ringClient.registerEventHandler(
            'LocalStorageCollectionUpdateEvent',
            async (event: LocalStorageCollectionUpdateEvent) => {
                this.saveCollection(event.data);
            }
        );
    }

    public static create() {
        return new LocalStorageClient(
            LocalStorageClient.ApplicationId,
            new LocalRingEventClient()
        );
    }

    private saveCollection(collection: LocalStorageCollection<any>) {
        if (!this.hasCollection(collection.name)) {
            throw new Error(
                `Can not save collection ${collection.name} because id does not exist`
            );
        }
        window.localStorage.setItem(
            this.calculateGlobalKey(collection.name),
            collection.serializeToJSON()
        );
    }

    createCollection(collectionName: string) {
        if (this.hasCollection(collectionName)) {
            throw new Error(`Collection ${collectionName} already exists`);
        }
        window.localStorage.setItem(
            this.calculateGlobalKey(collectionName),
            LocalStorageClient.EmptyCollection
        );
    }

    private calculateGlobalKey(relativeKey: string) {
        return `${this.applicationIdentifier}://${relativeKey}`;
    }

    hasCollection(collectionName: string) {
        return !isNil(
            window.localStorage.getItem(this.calculateGlobalKey(collectionName))
        );
    }

    getCollection<T extends Identifiable>(
        collectionName: string
    ): LocalStorageCollection<T> {
        if (!this.hasCollection(collectionName)) {
            throw new Error(`No collection with name ${collectionName}`);
        }
        return LocalStorageCollection.fromJSON<T>(
            collectionName,
            window.localStorage.getItem(
                this.calculateGlobalKey(collectionName)
            ) as string
        );
    }
}
