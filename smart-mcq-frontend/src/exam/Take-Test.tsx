import ExamService from "../services/exam.service";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Form";
import {
    UserTestDto,
    TestDto,
} from "../dto/question";
import Button from "@mui/material/Button";
import Layout from "../components/Layout";
import { FetchContext } from "../context";
import { FormError, FormField, SelectOption } from "../Form/types";
import Paper from "@mui/material/Paper";
import TestService from "../services/test.service";

export default function TakeTest() {

    const [exam, setExam] = React.useState<UserTestDto>(initExam());
    const [tests, setTests] = React.useState<SelectOption[]>([]);
    const [errors, setErrors] = React.useState<FormError>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    const history = useHistory();

    React.useEffect(() => {
        if (!Number.isNaN(Number.parseInt(id))) {
            whileLoading(
                ExamService.getMyTest(Number.parseInt(id)).then((res) =>
                    setExam(res.body as UserTestDto),
                ),
            );
        }
    }, [id, whileLoading]);

    React.useEffect(() => {
        whileLoading(
            TestService.getAll().then((res) =>
                setTests(
                    (res.body as TestDto[]).map((s) => ({
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
            ExamService.save(id, exam)
                .then(() => history.push("/exams"))
                .catch((res) => setErrors(res.errors)),
        );
    };

    const handleChange = (key: string, value: any) =>
        setExam((exam) => ({ ...exam, [key]: value }));

    const fields = React.useMemo(
        () => formFields(tests),
        [tests],
    );
    return (
        <Layout title="Take Test">
            <Paper className="paper-form paper">
                <form onSubmit={handleSubmit}>
                    <Form
                        data={exam}
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
    testOptions: SelectOption[],
): FormField[] => [
        { name: "id", label: "Id", type: "number" },
        { name: "userId", label: "User Id", type: "number" },
        {
            name: "test",
            label: "Test",
            type: "select",
            coerce: "int",
            options: testOptions,
        },
        { name: "startTime", label: "Start Time", type: "datetime" },
        { name: "endTime", label: "End Time", type: "datetime" },
    ];

const initExam = (): UserTestDto => ({
    id: 0,
    userId: 0,
    test: 0 as any,
    startTime: new Date(),
    endTime: new Date(),
});
