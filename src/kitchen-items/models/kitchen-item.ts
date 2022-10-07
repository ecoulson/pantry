import { KitchenItemType } from './kitchen-item-type';

export interface KitchenItem {
    type: KitchenItemType;
    name: string;
    price: string;
}
