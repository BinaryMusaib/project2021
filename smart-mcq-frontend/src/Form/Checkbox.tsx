import { FormField, OnChange } from "./types";
import { Checkbox as CheckboxField, FormControlLabel } from "@mui/material";

type CheckboxProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function Checkbox({ field, value, onChange }: CheckboxProps) {
    return (
        <FormControlLabel className="checkbox-text"
            label={field.label}
            control={
                <CheckboxField 
                    name={field.name}
                    checked={value}
                    onChange={(e) => onChange(field.name, e.target.checked)}
                />
            }
        />
    );
}
