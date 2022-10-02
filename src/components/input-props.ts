export interface InputProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}
