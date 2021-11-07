import { FormError, FormField, OnChange } from "./types";
import TextField from "@mui/material/TextField";
import FormErrors from "./FormErrors";

type FormProps = {
    fields: FormField[];
    data: any;
    onChange: OnChange;
    errors?: FormError;
};

export default function Form({ fields, data, onChange, errors }: FormProps) {
    return (
        <div className="form">
            <FormErrors errors={errors?.formErrors} />
            {fields.map((field, index) => (
                <div key={index} className="form-control">
                    <TextField
                        name={field.name}
                        type={field.type}
                        label={field.label}
                        value={(data as any)[field.name]}
                        variant="standard"
                        fullWidth
                        error={!!errors?.fieldErrors[field.name]}
                        helperText={toHelperText(errors?.fieldErrors, field)}
                        onChange={(e) => onChange(field.name, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

function toHelperText(
    errors: Partial<Record<string, string>> | undefined,
    field: FormField,
) {
    if (!errors) return null;
    const match = errors[field.name];
    if (!match) return null;
    return match.replace(field.name, field.label);
}
