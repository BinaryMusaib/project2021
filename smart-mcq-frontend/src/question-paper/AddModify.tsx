import Layout from "../components/Layout";
import { Paper, Button } from "@mui/material";
import {
    CreatePaperTopicDto,
    CreateQuestionPaperDto,
} from "../dto/question";
import React from "react";
import Form from "../Form";
import { useHistory, useParams } from "react-router-dom";
import QuestionPaperService from "../services/question-paper.service";
import { FetchContext } from "../context";
import { FormError } from "../services/fetch";
import TopicService from "../services/topic.service";
import Table, { TableColumn } from "../Table";
import PaperTopicDialog from "./PaperTopicDialog";
import { SelectOption } from "../Form/types";

export default function AddModify() {
    const [paper, setPaper] = React.useState<CreateQuestionPaperDto>(
        initPaper(),
    );
    const [errors, setErrors] = React.useState<FormError>();
    const [topicOptions, setTopicOptions] = React.useState<SelectOption[]>([]);
    const { id } = useParams<{ id: string }>();

    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id)))
            whileLoading(
                QuestionPaperService.getById(Number.parseInt(id)).then((res) =>
                    setPaper(res.body!),
                ),
            );

        whileLoading(
            TopicService.getAll().then((res) => {
                const topics = res.body!;
                setTopicOptions(
                    topics.map((t) => ({
                        label: t.title,
                        value: t.id.toString(),
                    })),
                );
            }),
        );
    }, [id, whileLoading]);

    const fields = React.useMemo(() => getFields(), []);
    const topicColumns = React.useMemo(() => getTopicColumns(), []);

    const handleChange = (key: string, value: any) => {
        setPaper((paper) => ({ ...paper, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        whileLoading(
            QuestionPaperService.save(id, paper)
                .then(() => history.push("/question-papers"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleSave = (paperTopic: CreatePaperTopicDto) =>
        setPaper((paper) => ({
            ...paper,
            paperTopics: [...paper.paperTopics, paperTopic],
        }));

    return (
        <Layout title="Add/Modify Question Paper">
            <form onSubmit={handleSubmit}>
                <Paper className="paper-form paper">
                    <Form
                        errors={errors}
                        fields={fields}
                        data={paper}
                        onChange={handleChange}
                    />
                    <Table columns={topicColumns} data={paper.paperTopics} />
                    <PaperTopicDialog
                        topicOptions={topicOptions}
                        onSave={handleSave}
                    />
                    <br />
                    <br />
                    <Button variant="contained" type="submit">
                        Save
                    </Button>
                </Paper>
            </form>
        </Layout>
    );
}

function initPaper(): CreateQuestionPaperDto {
    return {
        title: "",
        duration: 60,
        paperTopics: [
            {
                topicId: 1,
                numberOfQuestions: 11,
                level: "Easy",
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
            name: "duration",
            label: "Duration",
            type: "number",
        },
    ];
}

function getTopicColumns(): TableColumn[] {
    return [
        {
            name: "topicId",
            label: "Topic",
        },
        {
            name: "numberOfQuestions",
            label: "Number of Questions",
            type: "number",
        },
        {
            name: "level",
            label: "Level",
        },
    ];
}
