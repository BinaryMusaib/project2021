import { FormField, OnChange } from "./types";
import DateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";

type DateTimeProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function DateTime({
    hasError,
    helperText,
    field,
    value,
    onChange,
}: DateTimeProps) {
    return (
        <DateTimePicker
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
