export interface KitchenItemInputBarProps {
    onAddItem: () => void;
    onNameChange: (name: string) => void;
    onPriceChange: (price: string) => void;
    name: string;
    price: string;
}
