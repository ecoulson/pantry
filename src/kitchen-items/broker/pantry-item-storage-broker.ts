import { PantryItem } from '../models/pantry-item';
import { StorageBroker } from './storage-broker';

export interface PantryItemStorageBroker extends StorageBroker {
    findAll(): PantryItem[];
    add(produce: PantryItem): PantryItem;
}
