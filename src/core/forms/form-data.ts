export class FormData {
    public static clone(formData: FormData) {
        return new FormData(new Map(formData.data));
    }

    public static empty() {
        return new FormData(new Map());
    }

    public static fromDefaultValues(defaultValues: Record<string, string>) {
        return new FormData(new Map(Object.entries(defaultValues)));
    }

    constructor(private data: Map<string, string>) {}

    getOrDefaultField(field: string, defaultValue: string) {
        if (!this.hasField(field)) {
            return defaultValue;
        }
        return this.data.get(field) as string;
    }

    getField(field: string): string {
        if (!this.hasField(field)) {
            throw new Error(`No field ${field} in the form data`);
        }
        return this.data.get(field) as string;
    }

    hasField(field: string): boolean {
        return this.data.has(field);
    }

    setField(field: string, value: string) {
        this.data.set(field, value);
    }

    removeField(field: string) {
        if (!this.hasField(field)) {
            throw new Error(
                `No field ${field} to be removed from the form data`
            );
        }
        this.data.delete(field);
    }
}
