import { KitchenItem } from './kitchen-item';
import { KitchenItemType } from './kitchen-item-type';

export class Produce implements KitchenItem {
    public readonly type = KitchenItemType.Produce;

    constructor(
        public readonly name: string,
        public readonly price: string,
        public readonly weight: number,
        public readonly quantiy: number,
        public readonly dateOfPurchase: string
    ) {}

    get id() {
        return `${this.name.toLowerCase()}_${this.dateOfPurchase}`;
    }
}
