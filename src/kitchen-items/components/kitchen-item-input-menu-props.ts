import { FormData } from '../../core/forms/form-data';

export interface KitchenItemInputMenuProps {
    name: string;
    price: string;
    onChange: (formData: FormData) => void;
}
