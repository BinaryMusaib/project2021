import QuestionService from "../services/question.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Form";
import {
    UpdateQuestionDto,
    TopicDto,
    QuestionDto,
    UpdateOptionDto,
} from "../dto/question";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { FetchContext } from "../context";
import { FormError, FormField, SelectOption } from "../Form/types";
import Paper from "@mui/material/Paper";
import TopicService from "../services/topic.service";

export default function AddModify() {
    const [question, setQuestion] = React.useState<UpdateQuestionDto>(
        initQuestion(),
    );
    const [topics, setTopics] = React.useState<SelectOption[]>([]);
    const [errors, setErrors] = React.useState<FormError>();
    const { topicId, id } = useParams<{ topicId: string; id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                QuestionService.getById(Number.parseInt(id)).then((res) => {
                    const { topics, ...rest } = res.body as QuestionDto;
                    setQuestion({
                        ...rest,
                        topics: topics.map((t) => t.id),
                    });
                }),
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
                .then(() => history.push(`/topic/${topicId}/questions`))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) => {
        if (key === "options") {
            const { item, action, index } = value;
            switch (action) {
                case "add":
                    setQuestion((question) => ({
                        ...question,
                        options: [
                            ...question.options,
                            {
                                text: item,
                                isCorrect: false,
                                index: question.options.length,
                            },
                        ],
                    }));
                    break;

                case "delete":
                    setQuestion((question) => ({
                        ...question,
                        options: question.options.filter((o, i) => i !== index),
                    }));
                    break;

                case "check":
                    setQuestion((question) => ({
                        ...question,
                        options: question.options.map((o, i) =>
                            i === index ? { ...o, isCorrect: item } : o,
                        ),
                    }));
                    break;
            }
        } else {
            setQuestion((question) => ({ ...question, [key]: value }));
        }
    };

    const fields = React.useMemo(
        () => formFields(topics, question.options),
        [topics, question.options],
    );

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

const formFields = (
    topicOptions: SelectOption[],
    options: UpdateOptionDto[],
): FormField[] => {
    return [
        {
            name: "topics",
            label: "Topic",
            type: "select",
            multiple: true,
            coerce: "int",
            options: topicOptions,
        },
        { name: "text", label: "Question", type: "text", rows: 3 },
        { name: "randomize", type: "checkbox", label: "Randomize?" },
        {
            name: "level",
            label: "Level",
            type: "select",
            options: ["Easy", "Medium", "Difficult", "Expert"].map((s) => ({
                label: s,
                value: s,
            })),
        },
        {
            name: "options",
            label: "Answer",
            type: "option-list",
            coerce: "int",
            rows: 3,
            options: options.map((o) => ({
                label: o.text,
                value: o.id?.toString() || "",
                checked: o.isCorrect,
            })),
        },
        {
            name: "multi",
            label: "Multiple answers",
            type: "checkbox",
        },
    ];
};

const initQuestion = (): UpdateQuestionDto => ({
    topics: [],
    text: "",
    options: [],
    randomize: true,
    level: "Easy",
    multi: false,
});
