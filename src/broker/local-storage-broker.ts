import { BrowserStorageBroker } from './browser-storage-broker';

export class LocalStorageBroker<T> implements BrowserStorageBroker<T> {
    constructor(private readonly collectionName: string) {}

    setItem(key: string, object: T): void {
        window.localStorage.setItem(
            this.calculateConanicalKey(key),
            JSON.stringify(object)
        );
    }

    private calculateConanicalKey(key: string) {
        return `${this.collectionName}/${key}`;
    }

    getItem(key: string): T {
        const item = window.localStorage.getItem(
            this.calculateConanicalKey(key)
        );
        if (item === null || item === undefined) {
            throw new Error(`Failed to find the stored object with key ${key}`);
        }
        return JSON.parse(item);
    }

    deleteItem(key: string): boolean {
        const item = window.localStorage.getItem(
            this.calculateConanicalKey(key)
        );
        if (item === null || item === undefined) {
            return false;
        }
        window.localStorage.removeItem(key);
        return true;
    }
}
