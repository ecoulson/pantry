import { KitchenItemFormData } from './kitchen-item-form-data';

export interface EquipmentFormData extends KitchenItemFormData {
    brand: string;
    dateOfPurchase: string;
}
