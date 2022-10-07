import { KitchenItem } from './kitchen-item';
import { KitchenItemType } from './kitchen-item-type';

export class Equipment implements KitchenItem {
    public readonly type = KitchenItemType.Equipment;

    constructor(
        public readonly name: string,
        public readonly brand: string,
        public readonly price: string,
        public readonly dateOfPurchase: string
    ) {}

    get id() {
        return `${this.name.toLowerCase()}_${this.dateOfPurchase}`;
    }
}
