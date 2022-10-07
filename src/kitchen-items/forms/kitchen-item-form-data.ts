import { KitchenItemType } from '../models/kitchen-item-type';

export interface KitchenItemFormData {
    name: string;
    price: string;
    type: KitchenItemType;
}
