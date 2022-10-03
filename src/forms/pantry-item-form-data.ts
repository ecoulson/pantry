import { InventoryItemFormData } from './inventory-item-form-data';

export interface PantryItemFormData extends InventoryItemFormData {
    quantity: number;
    weight: string;
    volume: string;
    dateOfPurchase: string;
    dateOfExpiration: string;
}
