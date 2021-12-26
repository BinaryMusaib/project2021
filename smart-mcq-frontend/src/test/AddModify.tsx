import TestService from "../services/test.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Form";
import {
    CreateTestDto,
    ExamineeListDto,
    QuestionPaperDto,
} from "../dto/question";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { FetchContext } from "../context";
import { FormError, FormField, SelectOption } from "../Form/types";
import Paper from "@mui/material/Paper";
import ExamineeListService from "../services/examinee-list.service";
import QuestionPaperService from "../services/question-paper.service";

export default function AddModify() {
    const [test, setTest] = React.useState<CreateTestDto>(initTest());
    const [examinees, setExaminees] = React.useState<SelectOption[]>([]);
    const [papers, setPapers] = React.useState<SelectOption[]>([]);
    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                TestService.getById(Number.parseInt(id)).then((res) =>
                    setTest(res.body as CreateTestDto),
                ),
            );
        }
    }, [id, whileLoading]);

    React.useEffect(() => {
        whileLoading(
            ExamineeListService.getAll().then((res) =>
                setExaminees(
                    (res.body as ExamineeListDto[]).map((s) => ({
                        label: s.title,
                        value: s.id.toString(),
                    })),
                ),
            ),
        );
    }, [whileLoading]);

    React.useEffect(() => {
        whileLoading(
            QuestionPaperService.getAll().then((res) =>
                setPapers(
                    (res.body as QuestionPaperDto[]).map((s) => ({
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
            TestService.save(id, test)
                .then(() => history.push("/tests"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setTest((test) => ({ ...test, [key]: value }));

    const fields = React.useMemo(
        () => formFields(!id, examinees, papers),
        [id, examinees, papers],
    );

    const handleBack = () => history.push("/tests");

    return (
        <Layout title="Add/Modify Test">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={test}
                        fields={fields}
                        onChange={handleChange}
                        errors={errors}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                    &emsp;
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                </form>
            </Paper>
        </Layout>
    );
}

const formFields = (
    isNew: boolean,
    examineeListOptions: SelectOption[],
    questionPaperOptions: SelectOption[],
): FormField[] => [
        { name: "title", label: "Title", type: "text", disabled: !isNew },
        {
            name: "listId",
            label: "ExamineeList",
            type: "select",
            coerce: "int",
            options: examineeListOptions,
            disabled: !isNew,
        },
        {
            name: "paperId",
            label: "Question Paper",
            type: "select",
            coerce: "int",
            options: questionPaperOptions,
            disabled: !isNew,
        },
        { name: "startTime", label: "Start Time", type: "datetime" },
        { name: "endTime", label: "End Time", type: "datetime" },
    ];

const initTest = (): CreateTestDto => ({
    title: "",
    listId: 0,
    startTime: new Date(),
    endTime: new Date(),
    paperId: 0,
});
