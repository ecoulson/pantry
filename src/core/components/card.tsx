import { Section } from '../bases/section';
import { CardProps } from './card-props';

export function Card({ children }: CardProps) {
    return (
        <div className="drop-shadow-md rounded bg-slate-50 w-2/12">
            <Section>{children}</Section>
        </div>
    );
}
