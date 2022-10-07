import { KitchenItemFormData } from './kitchen-item-form-data';

export interface PantryItemFormData extends KitchenItemFormData {
    quantity: number;
    weight: string;
    volume: string;
    dateOfPurchase: string;
    dateOfExpiration: string;
}
