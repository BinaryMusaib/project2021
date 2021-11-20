import { TopicDto } from "../../dto/question";
import TopicService from "../../services/topic.service";
import React from "react";
import { FetchContext } from "../../context";
import Layout from "../../components/Layout";
import { List, ListItem, ListItemText, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";

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
            <div className="entity-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/questions/topic/new")}
                >
                    <AddIcon />
                </Fab>

                <List>
                    {topics.map((topic, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(
                                            `/questions/topic/${topic.id}`,
                                        )
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText
                                primary={topic.title}
                                secondary={topic.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Layout>
    );
}
