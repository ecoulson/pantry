import React from 'react';
import { ButtonProps } from './button-props';

export default function Button({ children }: ButtonProps) {
    return (
        <button className="bg-violet-500 text-white p-2 rounded-md w-2/12">
            {children}
        </button>
    );
}
