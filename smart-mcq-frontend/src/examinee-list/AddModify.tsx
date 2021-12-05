import ExamineeListService from "../services/examinee-list.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Form";
import { CreateExamineeListDto, CreateExamineesDto } from "../dto/question";
import { Paper, Button,IconButton } from "@mui/material";
import Layout from "../components/Layout";
import { FetchContext } from "../context";
import { FormError } from "../Form/types";
import Table, { TableColumn } from "../Table";
import ExamineesDialog from "./ExamineesDialog";
import { SelectOption } from "../Form/types";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddModify() {
    const [examinee, setExaminee] = React.useState<CreateExamineeListDto>(
        initExaminee(),
    );
    const [errors, setErrors] = React.useState<FormError>();
    const [examineeOptions, setExamineeOptions] = React.useState<SelectOption[]>([]);
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                ExamineeListService.getById(Number.parseInt(id)).then((res) =>
                    setExaminee(res.body as CreateExamineeListDto),
                ),
            );
        }
    }, [id, whileLoading]);

    const fields = React.useMemo(() => getFields(), []);

    const handleDelete = React.useCallback(
        (index: number) =>
            setExaminee(({ examinees, ...examinee }) => ({
                ...examinee,
                examinees: examinees.filter(
                    (e, eIndex) => eIndex !== index,
                ),
            })),
        [],
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            ExamineeListService.save(id, examinee)
                .then(() => history.push("/examinee-lists"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const examineeColumns = React.useMemo(
        () => getExamineeColumns(examineeOptions, handleDelete),
        [examineeOptions, handleDelete],
    );

    const handleChange = (key: string, value: any) =>
        setExaminee((examinee) => ({ ...examinee, [key]: value }));

    const handleSave = (examinees: CreateExamineesDto) =>
        setExaminee((examinee) => ({
            ...examinee,
            examinees: [...examinee.examinees, examinees],
        }));

    return (
        <Layout title="Add/Modify Examinee List">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={examinee}
                        fields={fields}
                        onChange={handleChange}
                        errors={errors}
                    />
                    <Table columns={examineeColumns} data={examinee.examinees} />
                    <ExamineesDialog
                        examineeOptions={examineeOptions}
                        onSave={handleSave}
                    />
                    <br />
                    <br />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}


function initExaminee(): CreateExamineeListDto {
    return {
        title: "",
        description: "",
        examinees: [
            {
                email: "example@gmail.com",
            },
        ],
    };
}

function getFields() {
    return [
        {
            name: "title",
            label: "Title",
            type: "text",
        },
        {
            name: "description",
            label: "Description",
            type: "text",
        },
    ];
}

function getExamineeColumns(
    examineeOptions: SelectOption[],
    onDelete: (id: number) => void,
): TableColumn[] {
    return [
        {
            type: "email",
            name: "email",
            label: "Email",
        },
        {
            type: "custom",
            label: "Actions",
            name: "email",
            format: (email: string, _: any, rowIndex: number) => (
                <IconButton onClick={() => onDelete(rowIndex)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];
}