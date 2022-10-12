import { Exception } from '../../../../exceptions/exception';

export class LocalStorageCollectionNotFoundException extends Exception {
    constructor(collectionName: string) {
        super(`Collection '${collectionName}' was not found.`);
    }
}
