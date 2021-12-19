import { UserTestDto } from "../dto/question";
import UserTestService from "../services/user-test.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { Paper, Typography } from "@mui/material";
import UserTestListPanel from "../user-tests/ListPanel";

export default function UserHome() {
    const [upcomingTests, setUpcomingTests] = React.useState<UserTestDto[]>([]);
    const [inProgressTests, setInProgressTests] = React.useState<UserTestDto[]>(
        [],
    );
    const { whileLoading } = React.useContext(FetchContext);

    React.useEffect(() => {
        whileLoading(
            Promise.all([
                UserTestService.getUpcomingTests(),
                UserTestService.getInProgressTests(),
            ]).then(([upcomingRes, inProgressRes]) => {
                setUpcomingTests(upcomingRes.body!);
                setInProgressTests(inProgressRes.body!);
            }),
        );
    }, [whileLoading]);

    return (
        <Layout title="Welcome">
            {inProgressTests.length ? (
                <Paper className="entity-list paper paper-list">
                    <Typography variant="subtitle1">
                        In Progress Tests
                    </Typography>

                    <UserTestListPanel userTests={inProgressTests} />
                </Paper>
            ) : null}
            {upcomingTests.length ? (
                <Paper className="entity-list paper paper-list">
                    <Typography variant="subtitle1">Upcoming Tests</Typography>

                    <UserTestListPanel userTests={upcomingTests} />
                </Paper>
            ) : null}
        </Layout>
    );
}
