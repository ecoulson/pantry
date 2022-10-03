export interface PantryInputBarProps {
    onAddItem: () => void;
    onNameChange: (name: string) => void;
    onPriceChange: (price: string) => void;
    name: string;
    price: string;
}
