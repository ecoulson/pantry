import { InventoryItemFormData } from './inventory-item-form-data';

export interface InventoryItemInputMenuProps {
    name: string;
    onChange: (formData: InventoryItemFormData) => void;
}
