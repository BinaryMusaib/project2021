import Layout from "../../components/Layout";
import LoadingPage from "../../components/LoadingPage";
import React from "react";
import { TestDetailsDto } from "../../dto/question";
import UserTestTable from "./UserTestTable";
import { useParams } from "react-router-dom";
import TestService from "../../services/test.service";
import { Paper } from "@mui/material";
import Header from "./Header";
import "./index.css";
import { FetchContext } from "../../context";

export default function TestDetails() {
    const [test, setTest] = React.useState<TestDetailsDto>();

    const { id } = useParams<{ id: string }>();

    const { whileLoading } = React.useContext(FetchContext);
    const loadTest = React.useCallback(
        (id: number) => {
            whileLoading(
                TestService.getDetailsById(id).then((res) =>
                    setTest(res.body!),
                ),
            );
        },
        [whileLoading, id],
    );

    const handleClose = () => {
        if (test?.id)
            whileLoading(TestService.closeTest(test.id)).then(() =>
                loadTest(test.id),
            );
    };

    React.useEffect(() => {
        const testId = Number.parseInt(id);
        if (!Number.isNaN(testId)) loadTest(testId);
    }, [loadTest]);

    if (!test) return <LoadingPage />;

    return (
        <Layout title={test.title}>
            <Header test={test} onClose={handleClose} />
            <Paper className="paper paper-table">
                <UserTestTable test={test} userTests={test.userTests} />
            </Paper>
        </Layout>
    );
}
