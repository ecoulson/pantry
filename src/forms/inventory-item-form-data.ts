import { PantryItemType } from '../models/pantry-item-type';

export interface InventoryItemFormData {
    name: string;
    price: string;
    type: PantryItemType;
}
