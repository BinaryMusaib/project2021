import { List, ListItem, ListItemText, Paper } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "./components/Layout";
import { SubjectDto } from "./dto";
import UserTestService from "./services/user-test.service";

export default function SubjectsUndertaken() {
    const [subjects, setSubjects] = React.useState<SubjectDto[]>([]);

    const history = useHistory();
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
                            <ListItemText
                                primary={subject.title}
                                secondary={subject.description}
                                onClick={() =>
                                    history.push(
                                        `/statistics/subject/${subject.id}`,
                                    )
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
