import { FormField, OnChange } from "./types";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

type DateProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function Date({
    hasError,
    helperText,
    field,
    value,
    onChange,
}: DateProps) {
    return (
        <DatePicker
            renderInput={(props) => (
                <TextField
                    error={hasError}
                    fullWidth
                    helperText={helperText}
                    name={field.name}
                    variant="standard"
                    {...props}
                />
            )}
            label={field.label}
            value={value}
            onChange={(newValue) => {
                onChange(field.name, newValue);
            }}
        />
    );
}
