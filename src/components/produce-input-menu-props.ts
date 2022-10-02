import { ProduceFormData } from './produce-form-data';

export interface ProduceInputMenuProps {
    name: string;
    onChange: (formData: ProduceFormData) => void;
}
