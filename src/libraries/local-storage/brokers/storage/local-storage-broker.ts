import { WebStorageBroker } from './web-storage-broker';

export class LocalStorageBroker implements WebStorageBroker {
    constructor(private readonly storage: Storage) {}

    keys() {
        return Object.keys(this.storage);
    }

    read(key: string): string | null {
        return this.storage.getItem(key);
    }

    write(key: string, data: string): void {
        this.storage.setItem(key, data);
    }

    delete(key: string): void {
        this.storage.removeItem(key);
    }
}
