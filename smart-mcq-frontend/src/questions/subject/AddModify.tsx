import SubjectService from "../../services/subject.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../../Form";
import { CreateSubjectDto } from "../../dto/question";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import { FetchContext } from "../../context";
import { FormError } from "../../Form/types";
import Paper from "@mui/material/Paper";

export default function AddModify() {
    const [subject, setSubject] = React.useState<CreateSubjectDto>(
        initSubject(),
    );
    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                SubjectService.getById(Number.parseInt(id)).then((res) =>
                    setSubject(res.body as CreateSubjectDto),
                ),
            );
        }
    }, [id, whileLoading]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            SubjectService.save(id, subject)
                .then(() => history.push("/subjects"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setSubject((subject) => ({ ...subject, [key]: value }));

    return (
        <Layout title="Add/Modify Subject">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={subject}
                        fields={formFields}
                        onChange={handleChange}
                        errors={errors}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

const formFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
];

const initSubject = () => ({
    title: "",
    description: "",
});
