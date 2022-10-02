import { PantryItemFormData } from '../components/pantry-item-form-data';
import { BrowserStorageBroker } from './browser-storage-broker';

export class LocalStorageBroker
    implements BrowserStorageBroker<PantryItemFormData>
{
    setItem(key: string, object: PantryItemFormData): void {
        window.localStorage.setItem(key, JSON.stringify(object));
    }

    getItem(key: string): PantryItemFormData {
        const item = window.localStorage.getItem(key);
        if (item === null || item === undefined) {
            throw new Error(`Failed to find the stored object with key ${key}`);
        }
        return JSON.parse(item);
    }

    deleteItem(key: string): boolean {
        const item = window.localStorage.getItem(key);
        if (item === null || item === undefined) {
            return false;
        }
        window.localStorage.removeItem(key);
        return true;
    }
}
