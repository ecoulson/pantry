import { PantryItemFormData } from './pantry-item-form-data';

export interface ProduceFormData extends PantryItemFormData {
    quantity: number;
    weight: number;
    dateOfPurchase: string;
}
