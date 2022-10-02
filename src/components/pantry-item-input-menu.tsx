import React, { useEffect, useState } from 'react';
import { FormData } from './form-data';
import { Input } from './input';
import { PantryItemFormData } from './pantry-item-form-data';
import { InventoryItemInputMenuProps } from './inventory-item-input-menu-props';
import { PantryItemType } from './pantry-item-type';

export function PantryItemInputMenu({
    name,
    onChange,
}: InventoryItemInputMenuProps) {
    const [formData, setFormData] = useState<FormData<PantryItemFormData>>({});
    useEffect(() => {
        onChange({
            type: PantryItemType.Pantry,
            name: name,
        });
    }, [name, formData]);

    function updateFormData(key: keyof PantryItemFormData, value: string) {
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
