import { UserTestDto, UserTestFilterDto } from "../dto/question";
import UserTestService from "../services/user-test.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { Paper } from "@mui/material";
import QueryForm from "./QueryForm";
import { addMonths } from "date-fns";
import ListPanel from "./ListPanel";
import SubjectService from "../services/subject.service";
import { SelectOption } from "../Form/types";

export default function UserTestList() {
    const [userTests, setUserTests] = React.useState<UserTestDto[]>([]);
    const [subjectOptions, setSubjectOptions] = React.useState<SelectOption[]>(
        [],
    );

    const { whileLoading } = React.useContext(FetchContext);

    const loadUserTests = React.useCallback(
        (filter: UserTestFilterDto) => {
            return whileLoading(
                UserTestService.query(filter).then((res) =>
                    setUserTests(res.body!),
                ),
            );
        },
        [whileLoading],
    );

    React.useEffect(() => {
        loadUserTests({
            startDate: new Date(),
            endDate: addMonths(new Date(), 3),
            subjectId: 0,
        });
    }, [loadUserTests]);

    React.useEffect(() => {
        whileLoading(
            SubjectService.getAll().then((res) =>
                setSubjectOptions(
                    res.body!.map((s) => ({
                        label: s.title,
                        value: s.id.toString(),
                    })),
                ),
            ),
        );
    }, [whileLoading]);

    return (
        <Layout title="Tests" description="Tests taken by you">
            <Paper className="entity-list paper paper-list">
                <QueryForm
                    onSubmit={loadUserTests}
                    subjectOptions={subjectOptions}
                />
                <ListPanel userTests={userTests} />
            </Paper>
        </Layout>
    );
}
