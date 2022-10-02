import React from 'react';
import { Button } from './button';
import { PantryInputBarProps } from './pantry-input-bar-props';

export const PantryInputBar = ({ onAddItem, onChange, value }: PantryInputBarProps) => {
    return (
        <div className="shadow-lg bg-slate-50 p-2 max-w-screen-lg rounded-md text-base">
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Enter pantry item"
                className="bg-transparent w-10/12 p-2 outline-0 text-lg"
            ></input>
            <Button onClick={onAddItem}>Add</Button>
        </div>
    );
};
