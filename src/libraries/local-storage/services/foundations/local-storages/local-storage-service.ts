import { isNil } from '../../../../../core/conditions/is-nil';
import { Delegate } from '../../../../../core/interfaces/delegate';
import { Exception } from '../../../../exceptions/exception';
import { tryCatch } from '../../../../exceptions/try-catch';
import { WebStorageBroker } from '../../../brokers/storage/web-storage-broker';
import { LocalStorageCollectionNotFoundException } from '../../../models/local-storage-collection/exceptions/local-storage-collection-not-found-exception';
import { LocalStorageCollection } from '../../../models/local-storage-collection/local-storage-collection';
import { FailedLocalStorageServiceException } from './exceptions/failed-local-storage-service-exception';
import { LocalStorageDependencyValidationException } from './exceptions/local-storage-dependency-validation-exception';
import { LocalStoragePermissionsException } from './exceptions/local-storage-permissions-exception';
import { LocalStorageServiceException } from './exceptions/local-storage-service-exception';
import { LocalStorageValidationException } from './exceptions/local-storage-validation-exception';

export class LocalStorageService {
    constructor(private readonly webStorageBroker: WebStorageBroker) {}

    createCollection(
        collection: LocalStorageCollection
    ): LocalStorageCollection {
        return tryCatch(
            () => {
                const collectionKey = this.createCollectionKey(
                    collection.applicationId,
                    collection.name
                );
                this.webStorageBroker.write(collectionKey, collection.data);
                return collection;
            },
            this.localStorageExceptionHandler((exception) =>
                this.createDefaultException(exception)
            )
        );
    }

    private createCollectionKey(applicationId: string, collectionName: string) {
        return `${applicationId}://${collectionName}`;
    }

    private localStorageExceptionHandler(
        handler: Delegate<Exception, Exception>
    ) {
        return (exception: Exception) => {
            if (this.isPermissionsException(exception)) {
                return this.createPermissionsException(exception);
            }
            return handler(exception);
        };
    }

    // see the following links for context
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
    private isPermissionsException(exception: Exception) {
        return (
            exception.innerException &&
            exception.innerException instanceof DOMException
        );
    }

    private createPermissionsException(exception: Exception) {
        return new LocalStorageDependencyValidationException(
            new LocalStoragePermissionsException(exception)
        );
    }

    private createDefaultException(innerException: Exception) {
        const failedServiceException = new FailedLocalStorageServiceException(
            innerException
        );
        return new LocalStorageServiceException(failedServiceException);
    }

    updateCollection(
        collection: LocalStorageCollection
    ): LocalStorageCollection {
        return tryCatch(
            () => {
                this.webStorageBroker.write(
                    this.createCollectionKey(
                        collection.applicationId,
                        collection.name
                    ),
                    collection.data
                );
                return collection;
            },
            this.localStorageExceptionHandler((exception) => {
                return this.createDefaultException(exception);
            })
        );
    }

    getCollection(
        applicationId: string,
        collectionName: string
    ): LocalStorageCollection {
        return tryCatch(
            () => {
                const collectionKey = this.createCollectionKey(
                    applicationId,
                    collectionName
                );
                const data = this.webStorageBroker.read(collectionKey);
                this.validateCollectionData(collectionName, data);
                return new LocalStorageCollection(
                    applicationId,
                    collectionName,
                    data as string
                );
            },
            this.localStorageExceptionHandler((exception) => {
                switch (exception.constructor) {
                    case LocalStorageCollectionNotFoundException:
                        return new LocalStorageValidationException(exception);
                    default:
                        return this.createDefaultException(exception);
                }
            })
        );
    }

    private validateCollectionData(
        collectionName: string,
        data: string | null
    ) {
        if (isNil(data)) {
            throw new LocalStorageCollectionNotFoundException(collectionName);
        }
    }

    deleteCollection(collection: LocalStorageCollection): void {
        return tryCatch(
            () =>
                this.webStorageBroker.delete(
                    this.createCollectionKey(
                        collection.applicationId,
                        collection.name
                    )
                ),
            this.localStorageExceptionHandler((exception) =>
                this.createDefaultException(exception)
            )
        );
    }
}
