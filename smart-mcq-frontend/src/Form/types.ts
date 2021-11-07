
export type OnChange = (name: string, value: any) => void;

export interface FormField {
    name: string;
    label: string;
    type: string;
}

export interface FormError {
    fieldErrors: Partial<Record<string, string>>
    formErrors: string[];
}
