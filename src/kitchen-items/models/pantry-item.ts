import { KitchenItem } from './kitchen-item';
import { KitchenItemType } from './kitchen-item-type';

export class PantryItem implements KitchenItem {
    public readonly type = KitchenItemType.Pantry;

    constructor(
        public readonly name: string,
        public readonly price: string,
        public readonly quantity: number,
        public readonly weight: string,
        public readonly volume: string,
        public readonly dateOfPurchase: string,
        public readonly dateOfExpiration: string
    ) {}

    get id() {
        return `${this.name.toLowerCase()}_${this.dateOfPurchase}`;
    }
}
