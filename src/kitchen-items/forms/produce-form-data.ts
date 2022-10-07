import { KitchenItemFormData } from './kitchen-item-form-data';

export interface ProduceFormData extends KitchenItemFormData {
    quantity: number;
    weight: number;
    dateOfPurchase: string;
}
