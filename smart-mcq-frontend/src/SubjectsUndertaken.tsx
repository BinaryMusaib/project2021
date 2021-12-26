import { List, ListItem, ListItemText, Paper } from "@mui/material";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "./components/Layout";
import { SubjectDto } from "./dto";
import UserTestService from "./services/user-test.service";

export default function SubjectsUndertaken() {
    const [subjects, setSubjects] = React.useState<SubjectDto[]>([]);
    React.useEffect(() => {
        UserTestService.getSubjectsUndertaken().then((res) =>
            setSubjects(res.body!),
        );
    }, []);

    return (
        <Layout title="Subject Performance">
            <Paper className="paper entity-list paper-list">
                <List>
                    {subjects.map((subject, index) => (
                        <ListItem key={index}>
                            <ListItemText secondary={subject.description}>
                                <Link
                                    to={`/user-test/statistics/${subject.id}`}
                                >
                                    {subject.title}
                                </Link>
                            </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
