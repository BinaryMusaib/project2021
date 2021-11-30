import {
    List,
    ListItem,
    ListItemText,
    Button,
    Fab,
    TextField,
    Checkbox,
    ListItemIcon,
} from "@mui/material";
import { FormField, OnChange } from "../Form/types";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

type OptionListProps = {
    field: FormField;
    value: any;
    onChange: OnChange;
    hasError: boolean;
    helperText: string | null;
};

export default function OptionList({
    field,
    value,
    onChange,
    hasError,
    helperText,
}: OptionListProps) {
    const [text, setText] = React.useState<string>("");

    const handleAdd = () => {
        onChange(field.name, {
            action: "add",
            index: value.length,
            item: text,
        });
        setText("");
    };

    const handleDelete = (index: number, item: any) => {
        onChange(field.name, {
            action: "delete",
            index,
            item,
        });
    };

    const handleCheck = (index: number, item: any) => {
        onChange(field.name, {
            action: "check",
            index,
            item,
        });
    };

    return (
        <div className="form-control">
            <div className="option-list-text">
                <TextField
                    label={field.label}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    fullWidth
                    error={hasError}
                    helperText={helperText}
                    variant="standard"
                    multiline={!!field.rows}
                    rows={field.rows}
                />

                <Button onClick={handleAdd} color="primary" variant="contained">
                    Add
                </Button>
            </div>
            <List>
                {(field.options || []).map(({ label, value, checked }, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <Fab
                                color="primary"
                                aria-label="edit"
                                size="small"
                                onClick={() => handleDelete(index, value)}
                            >
                                <DeleteIcon />
                            </Fab>
                        }
                    >
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked}
                                onChange={(e) =>
                                    handleCheck(index, e.target.checked)
                                }
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText className="optiontext" primary={label}></ListItemText>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
