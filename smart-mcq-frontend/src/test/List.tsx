import { TestDto } from "../dto/question";
import TestService from "../services/test.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { List, ListItem, ListItemText, Paper, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useHistory } from "react-router-dom";

export default function TestList() {
    const [tests, setTests] = React.useState<TestDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            TestService.getAll().then((res) =>
                setTests(res.body as TestDto[]),
            ),
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
                <List>
                    {tests.map((test, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(`test/${test.id}`)
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText
                                primary={test.title}

                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
