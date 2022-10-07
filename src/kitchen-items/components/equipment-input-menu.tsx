import React, { useEffect, useState } from 'react';
import { EquipmentFormData } from '../forms/equipment-form-data';
import { PantryItemType } from '../models/kitchen-item-type';
import { FormData } from '../forms/form-data';
import { KitchenItemInputMenuProps } from './kitchen-item-input-menu-props';
import { Input } from '../../core/components/input';

export function EquipmentInputMenu({
    name,
    price,
    onChange,
}: KitchenItemInputMenuProps) {
    const [formData, setFormData] = useState<FormData<EquipmentFormData>>({});
    useEffect(() => {
        onChange({
            type: PantryItemType.Equipment,
            name: name,
            brand: formData.brand ?? '',
            price: price,
            dateOfPurchase: formData.dateOfPurchase ?? '',
        } as EquipmentFormData);
    }, [name, formData]);

    function updateFormData(key: keyof EquipmentFormData, value: string) {
        let newFormData = { ...formData };
        newFormData[key] = value;
        setFormData(newFormData);
    }

    return (
        <div>
            <Input
                value={formData.brand ?? ''}
                name="brand"
                onChange={(brand) => updateFormData('brand', brand)}
                label="Brand"
                placeholder="Miele"
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
