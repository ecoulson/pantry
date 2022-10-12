import { useEffect, useState } from 'react';
import { FormData } from '../forms/form-data';

export function useForm<T extends Record<string, string>>(
    defaultFormData: T,
    onChange: (formData: FormData) => void
) {
    const [formData, setFormData] = useState(
        FormData.fromDefaultValues(defaultFormData)
    );

    useEffect(() => {
        onChange(formData);
    }, [formData, onChange]);

    function updateFormData(key: string) {
        return (value: string) => {
            formData.setField(key, value);
            setFormData(FormData.clone(formData));
        };
    }

    return { formData, updateFormData };
}
