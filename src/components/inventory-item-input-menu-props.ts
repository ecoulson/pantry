import { InventoryItemFormData } from '../forms/inventory-item-form-data';

export interface InventoryItemInputMenuProps {
    name: string;
    price: string;
    onChange: (formData: InventoryItemFormData) => void;
}
