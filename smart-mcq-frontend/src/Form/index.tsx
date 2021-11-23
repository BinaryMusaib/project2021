import { FormError, FormField, OnChange } from "./types";
import FormErrors from "./FormErrors";
import Field from "./Field";
import "./index.css";

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
                    <Field
                        field={field}
                        hasError={!!errors?.fieldErrors[field.name]}
                        helperText={toHelperText(errors?.fieldErrors, field)}
                        value={data[field.name]}
                        onChange={onChange}
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
