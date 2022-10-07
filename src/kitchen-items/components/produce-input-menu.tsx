import React, { useEffect, useState } from 'react';
import { Input } from '../../core/components/input';
import { FormData } from '../forms/form-data';
import { ProduceFormData } from '../forms/produce-form-data';
import { KitchenItemType } from '../models/kitchen-item-type';
import { KitchenItemInputMenuProps } from './kitchen-item-input-menu-props';

export function ProduceInputMenu({
    name,
    price,
    onChange,
}: KitchenItemInputMenuProps) {
    const [formData, setFormData] = useState<FormData<ProduceFormData>>({});
    useEffect(() => {
        onChange({
            quantity: formData.quantity ? parseInt(formData.quantity) : 0,
            weight: formData.weight ? parseFloat(formData.weight) : 0,
            type: KitchenItemType.Produce,
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
