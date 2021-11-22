import { FormField, OnChange } from "./types";
import Text from "./Text";
import Select from "./Select";

type FieldProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function Field(props: FieldProps) {
    switch (props.field.type) {
        case "text":
        case "number":
        case "email":
        case "tel":
        case "password":
            return <Text {...props} />;

        case "select":
            return <Select {...props} />;

        default:
            return <></>;
    }
}