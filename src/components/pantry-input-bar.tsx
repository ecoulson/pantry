import React from 'react';
import { Button } from './button';
import { PantryInputBarProps } from './pantry-input-bar-props';

export const PantryInputBar = ({
    onAddItem,
    onNameChange,
    onPriceChange,
    name,
    price,
}: PantryInputBarProps) => {
    return (
        <div className="shadow-lg bg-slate-50 p-2 max-w-screen-lg rounded-md text-base">
            <input
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                placeholder="Enter pantry item"
                className="bg-transparent w-8/12 p-2 outline-0 text-lg"
            />
            <input
                value={price}
                onChange={(event) => onPriceChange(event.target.value)}
                placeholder="$70.99"
                className="bg-transparent w-2/12 p-2 outline-0 text-lg"
            />
            <Button onClick={onAddItem}>Add</Button>
        </div>
    );
};
