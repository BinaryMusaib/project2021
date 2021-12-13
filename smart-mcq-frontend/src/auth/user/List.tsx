import { UserDto } from "../../dto";
import UserService from "../../services/user.service";
import React from "react";
import { FetchContext } from "../../context";
import Layout from "../../components/Layout";
import { List, ListItem, ListItemText, Paper, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";

export default function UserList() {
    const [users, setUsers] = React.useState<UserDto[]>([]);

    const history = useHistory();
    const { whileLoading } = React.useContext(FetchContext);
    React.useEffect(() => {
        whileLoading(
            UserService.getAll().then((res) => setUsers(res.body as UserDto[])),
        );
    }, [whileLoading]);

    return (
        <Layout title="Users">
            <Paper className="entity-list paper paper-list">
                <List>
                    {users.map((user, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Fab
                                    color="primary"
                                    aria-label="edit"
                                    size="small"
                                    onClick={() =>
                                        history.push(`user/${user.id}`)
                                    }
                                >
                                    <EditIcon />
                                </Fab>
                            }
                        >
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}`}
                                secondary={`${user.email}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Layout>
    );
}
