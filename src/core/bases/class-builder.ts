import { isNil } from '../conditions/is-nil';

export class ClassBuilder {
    private classes: string[];

    constructor() {
        this.classes = [];
    }

    addClasses(...classes: (string | undefined)[]): void {
        classes.forEach((className) => this.addClass(className));
    }

    addClass(className?: string): void {
        if (!isNil(className)) {
            this.classes.push(className as string);
        }
    }

    build(): string {
        return this.classes.join(' ');
    }
}
