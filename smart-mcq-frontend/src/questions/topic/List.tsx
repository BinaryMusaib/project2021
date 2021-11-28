import { TopicDto } from "../../dto/question";
import TopicService from "../../services/topic.service";
import React from "react";
import { FetchContext } from "../../context";
import Layout from "../../components/Layout";
import { List, ListItem, ListItemText, Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import TopicMenu from "./Menu";

export default function TopicList() {
    const [topics, setTopics] = React.useState<TopicDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            TopicService.getAll().then((res) =>
                setTopics(res.body as TopicDto[]),
            ),
        );
    }, [whileLoading]);

    return (
        <Layout title="Topics">
            <Paper className="entity-list paper paper-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/topic/new")}
                >
                    <AddIcon />
                </Fab>

                <List>
                    {topics.map((topic, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={<TopicMenu topicId={topic.id} />}
                        >
                            <ListItemText
                                primary={topic.title}
                                secondary={topic.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
