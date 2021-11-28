import { FormField, OnChange } from "./types";
import Text from "./Text";
import Select from "./Select";
import OptionList from "./OptionList";
import Checkbox from "./Checkbox";

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

        case "checkbox":
            return <Checkbox {...props} />;

        case "select":
            return <Select {...props} />;

        case "option-list":
            return <OptionList {...props} />;

        default:
            return <></>;
    }
}
