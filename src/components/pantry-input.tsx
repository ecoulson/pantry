import React, { useState } from 'react';
import { PantryInputBar } from './pantry-input-bar';
import { PantryInputMenu } from './pantry-input-menu';
import { PantryInputProps } from './pantry-input-props';
import { PantryItemFormData } from './pantry-item-form-data';

export function PantryInput({ onPantryItemAdded }: PantryInputProps) {
    const [input, setInput] = useState('');
    const [formData, setFormData] = useState<PantryItemFormData | null>(null);

    function renderInputMenu() {
        if (input.trim().length === 0) {
            return null;
        }
        return <PantryInputMenu name={input} onFormDataChange={setFormData} />;
    }

    function addPantryItem() {
        if (formData) {
            setInput('');
            onPantryItemAdded(formData);
        }
    }

    return (
        <>
            <PantryInputBar
                value={input}
                onAddItem={addPantryItem}
                onChange={setInput}
            />
            {renderInputMenu()}
        </>
    );
}
