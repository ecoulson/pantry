import { PantryItemType } from './pantry-item-type';

export class Produce {
    public readonly type = PantryItemType.Produce;

    constructor(
        public readonly name: string,
        public readonly price: string,
        public readonly weight: number,
        public readonly quantiy: number,
        public readonly dateOfPurchase: string
    ) {}

    id() {
        return `${this.type.toLowerCase()}/${this.name.toLowerCase()}_${
            this.dateOfPurchase
        }`;
    }
}
