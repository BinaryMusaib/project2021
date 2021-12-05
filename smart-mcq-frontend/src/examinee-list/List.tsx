import { ExamineeListDto } from "../dto/question";
import ExamineeListService from "../services/examinee-list.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { List, ListItem, ListItemText, Paper, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useHistory } from "react-router-dom";

export default function ExamineeList() {
    const [examinees, setExaminees] = React.useState<ExamineeListDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            ExamineeListService.getAll().then((res) =>
                setExaminees(res.body as ExamineeListDto[]),
            ),
        );
    }, [whileLoading]);

    return (
        <Layout title="Examinee List">
            <Paper className="entity-list paper paper-list">
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={() => history.push("/examinee-list/new")}
                >
                    <AddCircleIcon />
                </Fab>
                <List>
                    {examinees.map((examinee, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(
                                            `examinee-list/${examinee.id}`,
                                        )
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText
                                primary={examinee.title}
                                secondary={examinee.description}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
