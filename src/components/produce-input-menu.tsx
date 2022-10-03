import React, { useEffect, useState } from 'react';
import { FormData } from './form-data';
import { Input } from './input';
import { InventoryItemInputMenuProps } from './inventory-item-input-menu-props';
import { PantryItemType } from '../models/pantry-item-type';
import { ProduceFormData } from '../forms/produce-form-data';

export function ProduceInputMenu({
    name,
    price,
    onChange,
}: InventoryItemInputMenuProps) {
    const [formData, setFormData] = useState<FormData<ProduceFormData>>({});
    useEffect(() => {
        onChange({
            quantity: formData.quantity ? parseInt(formData.quantity) : 0,
            weight: formData.weight ? parseFloat(formData.weight) : 0,
            type: PantryItemType.Produce,
            name,
            price,
            dateOfPurchase: formData.dateOfPurchase ?? '',
        } as ProduceFormData);
    }, [name, price, formData]);

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
