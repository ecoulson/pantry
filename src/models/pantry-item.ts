import { PantryItemType } from './pantry-item-type';

export class PantryItem {
    public readonly type = PantryItemType.Pantry;

    constructor(
        public readonly name: string,
        public readonly price: string,
        public readonly quantity: number,
        public readonly weight: string,
        public readonly volume: string,
        public readonly dateOfPurchase: string,
        public readonly dateOfExpiration: string
    ) {}

    id() {
        return `pantry_item/${this.name.toLowerCase()}_${this.dateOfPurchase}`;
    }
}
