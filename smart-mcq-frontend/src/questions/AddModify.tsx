import QuestionService from "../services/question.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Form";
import { CreateQuestionDto, TopicDto } from "../dto/question";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { FetchContext } from "../context";
import { FormError, FormField, SelectOption } from "../Form/types";
import Paper from "@mui/material/Paper";
import TopicService from "../services/topic.service";

export default function AddModify() {
    const [question, setQuestion] = React.useState<CreateQuestionDto>(initQuestion());
    const [topics, setTopics] = React.useState<SelectOption[]>([]);
    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                QuestionService.getById(Number.parseInt(id)).then((res) =>
                    setQuestion(res.body as CreateQuestionDto),
                ),
            );
        }
    }, [id, whileLoading]);

    React.useEffect(() => {
        whileLoading(
            TopicService.getAll().then((res) =>
                setTopics(
                    (res.body as TopicDto[]).map((t) => ({
                        label: t.title,
                        value: t.id.toString(),
                    })),
                ),
            ),
        );
    }, [whileLoading]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        whileLoading(
            QuestionService.save(id, question)
                .then(() => history.push("/questions"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setQuestion((question) => ({ ...question, [key]: value }));

    const fields = React.useMemo(() => formFields(topics), [topics]);
    return (
        <Layout title="Add/Modify Questions">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={question}
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

const formFields = (topicOptions: SelectOption[]): FormField[] => [
    {
        name: "topicId",
        label: "Topic",
        type: "select",
        coerce: "int",
        options: topicOptions,
    },
    { name: "text", label: "Question", type: "text" },
    { name: "answer", label: "Answer", type: "number"},
];

const initQuestion = (): CreateQuestionDto => ({
    topicId: "" as any,
    text: "",
    answer: "" as any,
});
