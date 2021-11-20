import TopicService from "../../services/topic.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../../Form";
import { CreateTopicDto, SubjectDto } from "../../dto/question";
import Button from "@mui/material/Button";
import Layout from "../../components/Layout";
import { FetchContext } from "../../context";
import { FormError, FormField, SelectOption } from "../../Form/types";
import Paper from "@mui/material/Paper";
import SubjectService from "../../services/subject.service";

export default function AddModify() {
    const [topic, setTopic] = React.useState<CreateTopicDto>(initTopic());
    const [subjects, setSubjects] = React.useState<SelectOption[]>([]);
    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                TopicService.getById(Number.parseInt(id)).then((res) =>
                    setTopic(res.body as CreateTopicDto),
                ),
            );
        }
    }, [id, whileLoading]);

    React.useEffect(() => {
        whileLoading(
            SubjectService.getAll().then((res) =>
                setSubjects(
                    (res.body as SubjectDto[]).map((s) => ({
                        label: s.title,
                        value: s.id.toString(),
                    })),
                ),
            ),
        );
    }, [whileLoading]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            TopicService.save(id, topic)
                .then(() => history.push("/questions/topics"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setTopic((topic) => ({ ...topic, [key]: value }));

    const fields = React.useMemo(() => formFields(subjects), [subjects]);
    return (
        <Layout title="Add/Modify Topic">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={topic}
                        fields={fields}
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

const formFields = (subjectOptions: SelectOption[]): FormField[] => [
    {
        name: "subjectId",
        label: "Subject",
        type: "select",
        coerce: "int",
        options: subjectOptions,
    },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
];

const initTopic = (): CreateTopicDto => ({
    subjectId: "" as any,
    title: "",
    description: "",
});
