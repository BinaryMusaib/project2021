import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "../Form";
import { FormField, SelectOption } from "../Form/types";
import { CreateExamineesDto } from "../dto/question";

interface FormDialogProps {
    examineeOptions: SelectOption[];
    onSave: (examinees: CreateExamineesDto) => void;
}

export default function FormDialog({ examineeOptions, onSave }: FormDialogProps) {
    const [examinees, setExaminees] = React.useState<CreateExamineesDto>(
        initExaminees(),
    );
    const [open, setOpen] = React.useState(false);

    const handleSave = () => {
        setOpen(false);
        onSave(examinees);
        setExaminees(initExaminees());
    };

    const handleChange = (key: string, value: any) =>
        setExaminees((examinee) => ({ ...examinee, [key]: value }));

    const fields = React.useMemo(() => getFields(examineeOptions), [examineeOptions]);
    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Add Examinee
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add a New Examinee</DialogTitle>
                <DialogContent>
                    <Form
                        fields={fields}
                        data={examinees}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function getFields(examineeOptions: SelectOption[]): FormField[] {
    return [
        {
            name: "email",
            label: "Email",
            type: "email",
            options: examineeOptions,
        },
    ];
}

function initExaminees(): CreateExamineesDto {
    return {
        email: "",
    };
}
