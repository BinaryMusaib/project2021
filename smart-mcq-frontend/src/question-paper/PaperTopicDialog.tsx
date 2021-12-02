import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "../Form";
import { FormField, SelectOption } from "../Form/types";
import { CreatePaperTopicDto } from "../dto/question";

interface FormDialogProps {
    topicOptions: SelectOption[];
    onSave: (paperTopic: CreatePaperTopicDto) => void;
}

export default function FormDialog({ topicOptions, onSave }: FormDialogProps) {
    const [paperTopic, setPaperTopic] = React.useState<CreatePaperTopicDto>(
        initPaperTopic(),
    );
    const [open, setOpen] = React.useState(false);

    const handleSave = () => {
        setOpen(false);
        onSave(paperTopic);
        setPaperTopic(initPaperTopic());
    };

    const handleChange = (key: string, value: any) =>
        setPaperTopic((paper) => ({ ...paper, [key]: value }));

    const fields = React.useMemo(() => getFields(topicOptions), [topicOptions]);
    return (
        <div>
            <Button variant="outlined" onClick={() => setOpen(true)}>
                Add Topic
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add a new topic</DialogContentText>
                    <Form
                        fields={fields}
                        data={paperTopic}
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

function getFields(topicOptions: SelectOption[]): FormField[] {
    return [
        {
            name: "topicId",
            label: "Topic",
            type: "select",
            options: topicOptions,
            coerce: "int",
        },
        {
            name: "numberOfQuestions",
            label: "Number of Questions",
            type: "number",
        },
        {
            name: "level",
            label: "Difficulty Level",
            type: "select",
            options: ["Easy", "Medium", "Difficult", "Export"].map((s) => ({
                label: s,
                value: s,
            })),
        },
    ];
}

function initPaperTopic(): CreatePaperTopicDto {
    return {
        topicId: 0,
        numberOfQuestions: 10,
        level: "Easy",
    };
}
