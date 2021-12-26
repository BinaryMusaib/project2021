import { UserDto } from "../../dto";
import { List, ListItem, ListItemText, Fab } from "@mui/material";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

type ListPanelProps = {
    users: UserDto[];
};

export default function ListPanel({ users }: ListPanelProps) {
    const history = useHistory();
    return (
        <List>
            {users.map((user, index) => (
                <ListItem
                    key={index}
                    secondaryAction={
                        <Fab
                            color="primary"
                            aria-label="edit"
                            size="small"
                            onClick={() => history.push(`user/${user.id}`)}
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
    );
}
