import React, { useState } from 'react';
import { PantryInputBar } from './pantry-input-bar';
import { PantryInputMenu } from './pantry-input-menu';
import { PantryInputProps } from './pantry-input-props';
import { InventoryItemFormData } from '../forms/inventory-item-form-data';

export function PantryInput({ onPantryItemAdded }: PantryInputProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [formData, setFormData] = useState<InventoryItemFormData | null>(
        null
    );

    function renderInputMenu() {
        if (name.trim().length === 0 || price.trim().length === 0) {
            return null;
        }
        return (
            <PantryInputMenu price={price} name={name} onChange={setFormData} />
        );
    }

    function addPantryItem() {
        if (formData) {
            setName('');
            setPrice('');
            onPantryItemAdded(formData);
        }
    }

    return (
        <>
            <PantryInputBar
                name={name}
                price={price}
                onAddItem={addPantryItem}
                onNameChange={setName}
                onPriceChange={setPrice}
            />
            {renderInputMenu()}
        </>
    );
}
