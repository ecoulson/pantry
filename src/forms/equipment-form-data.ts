import { InventoryItemFormData } from './inventory-item-form-data';

export interface EquipmentFormData extends InventoryItemFormData {
    brand: string;
    dateOfPurchase: string;
}
