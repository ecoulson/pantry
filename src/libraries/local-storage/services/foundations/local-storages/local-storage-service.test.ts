import { instance, mock, reset, verify, when } from 'ts-mockito';
import { Exception } from '../../../../exceptions/exception';
import { LocalStorageBroker } from '../../../brokers/storage/local-storage-broker';
import { LocalStorageCollectionNotFoundException } from '../../../models/local-storage-collection/exceptions/local-storage-collection-not-found-exception';
import { LocalStorageCollection } from '../../../models/local-storage-collection/local-storage-collection';
import { FailedLocalStorageServiceException } from './exceptions/failed-local-storage-service-exception';
import { LocalStoragePermissionsException } from './exceptions/local-storage-permissions-exception';
import { LocalStorageServiceException } from './exceptions/local-storage-service-exception';
import { LocalStorageDependencyValidationException } from './exceptions/local-storage-dependency-validation-exception';
import { LocalStorageService } from './local-storage-service';
import { LocalStorageValidationException } from './exceptions/local-storage-validation-exception';

describe('Local Storage Service Test Suite', () => {
    const applicationId = 'application-id';
    const mockedBroker = mock(LocalStorageBroker);
    const service = new LocalStorageService(instance(mockedBroker));

    beforeEach(() => {
        reset(mockedBroker);
    });

    describe('createCollection', () => {
        test('Should create a collection', () => {
            const collectionName = 'collection-name';
            const emptyCollection = '{}';
            const givenCollection = new LocalStorageCollection(
                applicationId,
                collectionName,
                emptyCollection
            );
            const expectedCollection = givenCollection;
            const expectedCollectionKey = `${applicationId}://${collectionName}`;

            const actualCollection = service.createCollection(givenCollection);

            expect(actualCollection).toEqual(expectedCollection);
            verify(
                mockedBroker.write(expectedCollectionKey, emptyCollection)
            ).once();
        });

        test('Should throw a service exception when the broker fails', () => {
            const collectionName = 'collection-name';
            const emptyCollection = '{}';
            const collection = new LocalStorageCollection(
                applicationId,
                collectionName,
                emptyCollection
            );
            const innerException = new Exception();
            const failedException = new FailedLocalStorageServiceException(
                innerException
            );
            const expectedException = new LocalStorageServiceException(
                failedException
            );
            const expectedCollectionKey = `${applicationId}://${collectionName}`;
            when(
                mockedBroker.write(expectedCollectionKey, emptyCollection)
            ).thenThrow(innerException);

            const action = () => service.createCollection(collection);
            expect(action).toThrow(expectedException);

            verify(
                mockedBroker.write(expectedCollectionKey, emptyCollection)
            ).once();
        });

        test('Should throw a dependency exception when writing a security exception is thrown', () => {
            const collectionName = 'collection-name';
            const emptyCollection = '{}';
            const collection = new LocalStorageCollection(
                applicationId,
                collectionName,
                emptyCollection
            );
            const innerException = new Exception(
                '',
                new DOMException('', 'SecurityError')
            );
            const permissionsException = new LocalStoragePermissionsException(
                innerException
            );
            const expectedException =
                new LocalStorageDependencyValidationException(
                    permissionsException
                );
            const expectedCollectionKey = `${applicationId}://${collectionName}`;
            when(
                mockedBroker.write(expectedCollectionKey, emptyCollection)
            ).thenThrow(innerException);

            const action = () => service.createCollection(collection);
            expect(action).toThrow(expectedException);

            verify(
                mockedBroker.write(expectedCollectionKey, emptyCollection)
            ).once();
        });
    });

    describe('getCollection', () => {
        test('Should get a collection', () => {
            const collectionName = 'collection-name';
            const storedValue = '{}';
            const expectedLocalStorageCollection = new LocalStorageCollection(
                applicationId,
                collectionName,
                storedValue
            );
            const expectedCollectionKey = `${applicationId}://${collectionName}`;
            when(mockedBroker.read(expectedCollectionKey)).thenReturn(
                storedValue
            );

            const acutalLoalStorageCollection = service.getCollection(
                applicationId,
                collectionName
            );

            expect(acutalLoalStorageCollection).toEqual(
                expectedLocalStorageCollection
            );
            verify(mockedBroker.read(expectedCollectionKey)).once();
        });

        test('Should throw a service exception when an exception is thrown', () => {
            const collectionName = 'collection-name';
            const innerException = new Exception();
            const failedException = new FailedLocalStorageServiceException(
                innerException
            );
            const expectedException = new LocalStorageServiceException(
                failedException
            );
            const expectedCollectionKey = `${applicationId}://${collectionName}`;
            when(mockedBroker.read(expectedCollectionKey)).thenThrow(
                innerException
            );

            const action = () =>
                service.getCollection(applicationId, collectionName);
            expect(action).toThrow(expectedException);

            verify(mockedBroker.read(expectedCollectionKey)).once();
        });

        test('Should throw a validation exception when the read data is null', () => {
            const collectionName = 'collection-name';
            const notFoundException =
                new LocalStorageCollectionNotFoundException(collectionName);
            const expectedException = new LocalStorageValidationException(
                notFoundException
            );
            const expectedCollectionKey = `${applicationId}://${collectionName}`;
            when(mockedBroker.read(expectedCollectionKey)).thenReturn(null);

            const action = () =>
                service.getCollection(applicationId, collectionName);
            expect(action).toThrow(expectedException);

            verify(mockedBroker.read(expectedCollectionKey)).once();
        });

        test('Should throw a service exception when a permission exception is thrown', () => {
            const collectionName = 'collection-name';
            const innerException = new Exception(
                '',
                new DOMException('', 'SecurityError')
            );
            const permissionsException = new LocalStoragePermissionsException(
                innerException
            );
            const expectedException =
                new LocalStorageDependencyValidationException(
                    permissionsException
                );
            const expectedCollectionKey = `${applicationId}://${collectionName}`;
            when(mockedBroker.read(expectedCollectionKey)).thenThrow(
                innerException
            );

            const action = () =>
                service.getCollection(applicationId, collectionName);
            expect(action).toThrow(expectedException);

            verify(mockedBroker.read(expectedCollectionKey)).once();
        });
    });

    describe('updateCollection', () => {});

    describe('deleteCollection', () => {
        test('Should delete a collection', () => {
            const collectionName = 'collection-name';
            const expectedKey = `${applicationId}://${collectionName}`;
            const collection = new LocalStorageCollection(
                applicationId,
                collectionName,
                ''
            );

            service.deleteCollection(collection);

            verify(mockedBroker.delete(expectedKey)).once();
        });

        test('Should throw an exception when deleting throws an exception', () => {
            const collectionName = 'collection-name';
            const innerException = new Exception();
            const collection = new LocalStorageCollection(
                applicationId,
                collectionName,
                ''
            );
            const failedException = new FailedLocalStorageServiceException(
                innerException
            );
            const expectedException = new LocalStorageServiceException(
                failedException
            );
            const expectedKey = `${applicationId}://${collectionName}`;
            when(mockedBroker.delete(expectedKey)).thenThrow(innerException);

            const action = () => service.deleteCollection(collection);
            expect(action).toThrow(expectedException);

            verify(mockedBroker.delete(expectedKey)).once();
        });

        test('Should throw a dependency exception when deleting the broker throws a security exception', () => {
            const collectionName = 'collection-name';
            const innerException = new Exception(
                '',
                new DOMException('', 'SecurityError')
            );
            const collection = new LocalStorageCollection(
                applicationId,
                collectionName,
                ''
            );
            const permissionsException = new LocalStoragePermissionsException(
                innerException
            );
            const expectedException =
                new LocalStorageDependencyValidationException(
                    permissionsException
                );
            const expectedKey = `${applicationId}://${collectionName}`;
            when(mockedBroker.delete(expectedKey)).thenThrow(innerException);

            const action = () => service.deleteCollection(collection);
            expect(action).toThrow(expectedException);

            verify(mockedBroker.delete(expectedKey)).once();
        });
    });
});
