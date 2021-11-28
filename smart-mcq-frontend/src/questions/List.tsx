import { QuestionDto } from "../dto/question";
import QuestionService from "../services/question.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { List, ListItem, ListItemText, Fab, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useHistory, useParams } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function QuestionList() {
    const [questions, setQuestions] = React.useState<QuestionDto[]>([]);
    const [topicName, setTopicName] = React.useState<string>();

    const history = useHistory();
    const { topicId } = useParams<{ topicId: string }>();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            QuestionService.getManyByTopic(Number.parseInt(topicId)).then(
                (res) => {
                    const questions = res.body!;
                    setQuestions(questions);
                    if (questions.length > 0)
                        setTopicName(
                            extractTopicNameFromQuestion(questions[0], topicId),
                        );
                },
            ),
        );
    }, [whileLoading]);

    const topNav = [
        { link: `/topics`, text: topicName || "Topic" },
        { text: "Questions" },
    ];

    return (
        <Layout title="Questions">
            <Paper className="entity-list paper paper-list">
                <TopNav breadcrumbs={topNav as any} />
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() =>
                        history.push(`/topic/${topicId}/questions/new`)
                    }
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
                                            `/topic/${topicId}/questions/${question.id}`,
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
            </Paper>
        </Layout>
    );
}

function extractTopicNameFromQuestion(question: QuestionDto, topicId: string) {
    const topic = question.topics.find((t) => t.id.toString() === topicId);
    return topic?.title;
}
