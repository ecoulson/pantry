import React, { useState } from 'react';
import { PantryInputBar } from './pantry-input-bar';
import { PantryInputMenu } from './pantry-input-menu';

export function PantryInput() {
    const [input, setInput] = useState('');

    function renderInputMenu() {
        if (input.trim().length === 0) {
            return null;
        }
        return <PantryInputMenu name={input} />;
    }

    return (
        <>
            <PantryInputBar onChange={setInput} />
            {renderInputMenu()}
        </>
    );
}
