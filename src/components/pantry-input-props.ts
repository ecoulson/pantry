import { InventoryItemFormData } from './inventory-item-form-data';

export interface PantryInputProps {
    onPantryItemAdded: (data: InventoryItemFormData) => void;
}
