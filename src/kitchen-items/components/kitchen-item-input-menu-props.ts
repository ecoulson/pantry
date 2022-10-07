import { KitchenItemFormData } from '../forms/kitchen-item-form-data';

export interface KitchenItemInputMenuProps {
    name: string;
    price: string;
    onChange: (formData: KitchenItemFormData) => void;
}
