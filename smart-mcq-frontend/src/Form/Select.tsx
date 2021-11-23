import { FormField, OnChange } from "./types";
import {
    Select as SelectField,
    InputLabel,
    MenuItem,
    FormControl,
    FormHelperText,
} from "@mui/material";
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

    console.log(value, "select value");
    return (
        <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <SelectField
                name={field.name}
                multiple={!!field.multiple}
                variant="standard"
                fullWidth
                value={value}
                error={hasError}
                onChange={(e) => {
                    const value = e.target.value;
                    const coerced =
                        typeof value === "string"
                            ? field.multiple
                                ? value.split(",").map((v) => coerceFn(v))
                                : coerceFn(value)
                            : value;
                    onChange(field.name, coerced);
                }}
            >
                {(field.options || []).map((o) => (
                    <MenuItem key={o.value} value={o.value}>
                        {o.label}
                    </MenuItem>
                ))}
            </SelectField>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
}
