import { InventoryItemFormData } from '../forms/inventory-item-form-data';

export interface PantryInputProps {
    onPantryItemAdded: (data: InventoryItemFormData) => void;
}
