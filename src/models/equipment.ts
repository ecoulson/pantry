import { PantryItemType } from './pantry-item-type';

export class Equipment {
    public readonly type = PantryItemType.Equipment;

    constructor(
        public readonly name: string,
        public readonly brand: string,
        public readonly price: string,
        public readonly dateOfPurchase: string
    ) {}

    id() {
        return `equipment/${this.name.toLowerCase()}_${this.dateOfPurchase}`;
    }
}
