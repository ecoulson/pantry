import React from 'react';
import { SectionProps } from './section-props';

export function Section({ children }: SectionProps) {
    return <div className="px-10 py-5">{children}</div>;
}
