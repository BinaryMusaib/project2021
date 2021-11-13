import { SubjectDto } from "../../dto/question";
import SubjectService from "../../services/subject.service";
import React from "react";
import { FetchContext } from "../../context";
import Layout from "../../components/Layout";
import { List, ListItem, ListItemText, IconButton, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
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
            <div className="entity-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => history.push("/questions/subject/new")}
                >
                    <AddIcon />
                </Fab>
                <List>
                    {subjects.map((subject, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() =>
                                        history.push(
                                            `/questions/subject/${subject.id}`,
                                        )
                                    }
                                >
                                    <EditIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={subject.title}
                                secondary={subject.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Layout>
    );
}
