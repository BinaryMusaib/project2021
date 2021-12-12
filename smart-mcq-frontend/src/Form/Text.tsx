import { FormField, OnChange } from "./types";
import TextField from "@mui/material/TextField";

type TextProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function Text({
    field,
    value,
    helperText,
    hasError,
    onChange,
}: TextProps) {
    return (
        <TextField
            multiline={!!field.rows}
            name={field.name}
            type={field.type}
            label={field.label}
            value={value}
            rows={field.rows}
            variant="standard"
            disabled={!!field.disabled}
            fullWidth
            error={hasError}
            helperText={helperText}
            onChange={(e) => onChange(field.name, e.target.value)}
        />
    );
}
