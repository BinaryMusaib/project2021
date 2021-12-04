import Layout from "../components/Layout";
import { Paper, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    CreatePaperTopicDto,
    CreateQuestionPaperDto,
    PaperTopicDto,
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

    const handleDelete = React.useCallback(
        (index: number) =>
            setPaper(({ paperTopics, ...paper }) => ({
                ...paper,
                paperTopics: paperTopics.filter(
                    (pt, ptIndex) => ptIndex !== index,
                ),
            })),
        [],
    );

    const topicColumns = React.useMemo(
        () => getTopicColumns(topicOptions, handleDelete),
        [topicOptions, handleDelete],
    );

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

function getTopicColumns(
    topicOptions: SelectOption[],
    onDelete: (id: number) => void,
): TableColumn[] {
    return [
        {
            type: "custom",
            name: "topicId",
            label: "Topic",
            format: (topicId: any) => (
                <span>
                    {
                        topicOptions.find(
                            (o) => o.value === topicId?.toString(),
                        )?.label
                    }
                </span>
            ),
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
        {
            type: "custom",
            label: "Actions",
            name: "topicId",
            format: (topicId: number, _: any, rowIndex: number) => (
                <IconButton onClick={() => onDelete(rowIndex)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];
}
