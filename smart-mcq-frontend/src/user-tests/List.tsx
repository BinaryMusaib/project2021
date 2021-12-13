import { UserTestDto, UserTestFilterDto } from "../dto/question";
import UserTestService from "../services/user-test.service";
import React from "react";
import { FetchContext } from "../context";
import Layout from "../components/Layout";
import { List, ListItem, ListItemText, Paper, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import QueryForm from "./QueryForm";
import { addMonths } from "date-fns";

export default function UserTestList() {
    const [userTests, setUserTests] = React.useState<UserTestDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);

    const loadUserTests = React.useCallback(
        (filter: UserTestFilterDto) => {
            return whileLoading(
                UserTestService.query(filter).then((res) =>
                    setUserTests(res.body!),
                ),
            );
        },
        [whileLoading],
    );

    React.useEffect(() => {
        loadUserTests({
            startDate: new Date(),
            endDate: addMonths(new Date(), 3),
        });
    }, [whileLoading, loadUserTests]);

    return (
        <Layout title="UserTests">
            <Paper className="entity-list paper paper-list">
                <QueryForm onSubmit={loadUserTests} />
                <List>
                    {userTests.map((userTest, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(
                                            `/start-test/${userTest.id}`,
                                        )
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText primary={userTest.test.title} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
