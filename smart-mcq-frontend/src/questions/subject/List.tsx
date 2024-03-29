import { SubjectDto } from "../../dto/question";
import SubjectService from "../../services/subject.service";
import React from "react";
import { FetchContext } from "../../context";
import Layout from "../../components/Layout";
import { List, ListItem, ListItemText, Paper, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useHistory } from "react-router-dom";

export default function SubjectList() {
    const [subjects, setSubjects] = React.useState<SubjectDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            SubjectService.getAll().then((res) =>
                setSubjects(res.body as SubjectDto[]),
            ),
        );
    }, [whileLoading]);

    return (
        <Layout title="Subjects">
            <Paper className="entity-list paper paper-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/subject/new")}
                >
                    <AddCircleIcon />
                </Fab>
                <List>
                    {subjects.map((subject, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(`subject/${subject.id}`)
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText
                                primary={subject.title}
                                secondary={subject.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
