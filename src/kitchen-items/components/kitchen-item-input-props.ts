import { KitchenItemFormData } from '../forms/kitchen-item-form-data';

export interface KitchenItemInputProps {
    onPantryItemAdded: (data: KitchenItemFormData) => void;
}
