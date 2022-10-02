import { PantryItemFormData } from './pantry-item-form-data';

export interface PantryInputMenuProps {
    name: string;
    onFormDataChange: (formData: PantryItemFormData) => void;
}
