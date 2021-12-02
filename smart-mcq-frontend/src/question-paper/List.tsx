import { QuestionPaperDto } from "../dto/question";
import QuestionPaperService from "../services/question-paper.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { List, ListItem, ListItemText, Paper, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useHistory } from "react-router-dom";

export default function QuestionPaperList() {
    const [papers, setPapers] = React.useState<QuestionPaperDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            QuestionPaperService.getAll().then((res) =>
                setPapers(res.body as QuestionPaperDto[]),
            ),
        );
    }, [whileLoading]);

    return (
        <Layout title="Question Paper">
            <Paper className="entity-list paper paper-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/question-paper/new")}
                >
                    <AddCircleIcon />
                </Fab>
                <List>
                    {papers.map((paper, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(`question-paper/${paper.id}`)
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText
                                primary={paper.title}
                                secondary={paper.id}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
