import { PantryItemFormData } from './pantry-item-form-data';

export interface PantryInputProps {
    onPantryItemAdded: (data: PantryItemFormData) => void;
}
