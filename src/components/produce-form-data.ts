import { InventoryItemFormData } from './inventory-item-form-data';

export interface ProduceFormData extends InventoryItemFormData {
    quantity: number;
    weight: number;
    dateOfPurchase: string;
}
