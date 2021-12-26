import React from "react";
import LoadingPage from "../../components/LoadingPage";
import Layout from "../../components/Layout";
import { ExamineeListDto } from "../../dto";
import { IconButton, List, ListItem, ListItemText, Paper } from "@mui/material";
import ExamineeListService from "../../services/examinee-list.service";
import { useHistory, useParams } from "react-router-dom";
import StatsIcon from "@mui/icons-material/QueryStats";

export default function ExamineeListDetails() {
    const [examineeList, setExamineeList] = React.useState<ExamineeListDto>();

    const { id } = useParams<{ id: string }>();
    React.useEffect(() => {
        const listId = Number.parseInt(id);
        if (!Number.isNaN(listId))
            ExamineeListService.getById(listId).then((res) =>
                setExamineeList(res.body!),
            );
    }, []);

    const history = useHistory();

    if (!examineeList) return <LoadingPage />;

    return (
        <Layout
            title={examineeList.title}
            description={examineeList.description}
        >
            <Paper className="paper entity-list">
                <List>
                    {examineeList.examinees.map((e, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        history.push(
                                            `/examinee/statistics/${e.id}`,
                                        )
                                    }
                                >
                                    <StatsIcon color="secondary" />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={`${e.firstName} ${e.lastName}`}
                                secondary={e.email}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
