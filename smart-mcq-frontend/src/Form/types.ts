
export type OnChange = (name: string, value: any) => void;

export interface FormField {
    name: string;
    label: string;
    type: string;
    options?: SelectOption[]
    coerce?: 'int'
    multiple?: boolean
    rows?: number
}

export interface FormError {
    fieldErrors: Partial<Record<string, string>>
    formErrors: string[];
}

export interface SelectOption {
    label: string;
    value: string;
    checked?: boolean
}
