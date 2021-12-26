import { TestDto } from "../dto/question";
import TestService from "../services/test.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { Paper, Fab, Tab, Tabs, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useHistory } from "react-router-dom";
import TestListPanel from "./ListPanel";

export default function TestList() {
    const [openTests, setOpenTests] = React.useState<TestDto[]>([]);
    const [closedTests, setClosedTests] = React.useState<TestDto[]>([]);
    const [tabPos, setTabPos] = React.useState<number>(0);
    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            TestService.getAll().then((res) => {
                const tests = res.body!;
                setOpenTests(tests.filter((t) => !t.closed));
                setClosedTests(tests.filter((t) => t.closed));
            }),
        );
    }, [whileLoading]);

    return (
        <Layout title="Tests">
            <Paper className="entity-list paper paper-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/test/new")}
                >
                    <AddCircleIcon />
                </Fab>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabPos}
                        onChange={(e: any, pos: number) => setTabPos(pos)}
                    >
                        <Tab label="Open" />
                        <Tab label="Closed" />
                    </Tabs>
                </Box>
                {tabPos === 0 ? (
                    <TestListPanel tests={openTests} />
                ) : (
                    <TestListPanel tests={closedTests} />
                )}
            </Paper>
        </Layout>
    );
}
