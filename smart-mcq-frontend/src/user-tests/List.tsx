import { UserTestDto, UserTestFilterDto } from "../dto/question";
import UserTestService from "../services/user-test.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { Paper } from "@mui/material";
import QueryForm from "./QueryForm";
import { addMonths } from "date-fns";
import ListPanel from "./ListPanel";

export default function UserTestList() {
    const [userTests, setUserTests] = React.useState<UserTestDto[]>([]);
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
        });
    }, [whileLoading, loadUserTests]);

    return (
        <Layout title="UserTests">
            <Paper className="entity-list paper paper-list">
                <QueryForm onSubmit={loadUserTests} />
                <ListPanel userTests={userTests} />
            </Paper>
        </Layout>
    );
}
