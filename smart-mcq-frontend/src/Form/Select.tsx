import { FormField, OnChange } from "./types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { coercer } from "./utils";

type SelectProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function Select({
    field,
    value,
    helperText,
    hasError,
    onChange,
}: SelectProps) {
    const coerceFn = coercer(field.coerce);

    return (
        <TextField
            select
            name={field.name}
            type={field.type}
            label={field.label}
            value={value}
            variant="standard"
            fullWidth
            error={hasError}
            helperText={helperText}
            onChange={(e) => onChange(field.name, coerceFn(e.target.value))}
        >
            {(field.options || []).map((o) => (
                <MenuItem key={o.value} value={o.value}>
                    {o.label}
                </MenuItem>
            ))}
        </TextField>
    );
}
