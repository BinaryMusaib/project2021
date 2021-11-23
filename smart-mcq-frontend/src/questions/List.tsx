import { QuestionDto } from "../dto/question";
import QuestionService from "../services/question.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { List, ListItem, ListItemText, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

export default function QuestionList() {
    const [questions, setQuestions] = React.useState<QuestionDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            QuestionService.getAll().then((res) =>
                setQuestions(res.body as QuestionDto[]),
            ),
        );
    }, [whileLoading]);

    return (
        <Layout title="Questions">
            <div className="entity-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/questions/new")}
                >
                    <AddIcon />
                </Fab>

                <List>
                    {questions.map((question, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(
                                            `/questions/${question.id}`,
                                        )
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText primary={question.text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Layout>
    );
}
