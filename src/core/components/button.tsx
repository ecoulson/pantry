import React from 'react';
import { ButtonProps } from './button-props';

export function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-violet-500 text-white p-2 rounded-md w-2/12"
        >
            {children}
        </button>
    );
}
