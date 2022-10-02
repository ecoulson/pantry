import React, { useEffect, useState } from 'react';
import { FormData } from './form-data';
import { Input } from './input';
import { PantryItemType } from './pantry-item-type';
import { ProduceFormData } from './produce-form-data';
import { ProduceInputMenuProps } from './produce-input-menu-props';

export function ProduceInputMenu({ name, onChange }: ProduceInputMenuProps) {
    const [formData, setFormData] = useState<FormData<ProduceFormData>>({});
    useEffect(() => {
        onChange({
            quantity: formData.quantity ? parseInt(formData.quantity) : 0,
            weight: formData.weight ? parseFloat(formData.weight) : 0,
            type: PantryItemType.Pantry,
            name: name,
            dateOfPurchase: formData.dateOfPurchase ?? '',
        });
    }, [name, formData]);

    function updateFormData(key: keyof ProduceFormData, value: string) {
        let newFormData = { ...formData };
        newFormData[key] = value;
        setFormData(newFormData);
    }

    return (
        <div>
            <Input
                value={formData.quantity ?? ''}
                name="quantity"
                onChange={(quantity) => updateFormData('quantity', quantity)}
                placeholder="Enter quantity"
                label="Quantity"
            />
            <Input
                value={formData.weight ?? ''}
                name="weight"
                onChange={(weight) => updateFormData('weight', weight)}
                placeholder="Enter weight in lbs"
                label="Weight"
            />
            <Input
                value={formData.dateOfPurchase ?? ''}
                name="dateOfPurchase"
                onChange={(dateOfPurchase) =>
                    updateFormData('dateOfPurchase', dateOfPurchase)
                }
                label="Date Of Purchase (mm/dd/yyyy)"
                placeholder="10/16/2000"
            />
        </div>
    );
}
