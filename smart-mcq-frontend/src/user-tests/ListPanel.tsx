import { UserTestDto } from "../dto/question";
import { List, ListItem, ListItemText } from "@mui/material";
import UserTestRouter from "./UserTestRouter";
import UserTestText from "./UserTestText";
import DateRange from "./DateRange";
import UserName from "./UserName";
import "./ListPanel.css";

type ListPanelProps = {
    userTests: UserTestDto[];
};

export default function ListPanel({ userTests }: ListPanelProps) {
    return (
        <List>
            {userTests.map((userTest, index) => (
                <ListItem
                    key={index}
                    secondaryAction={<UserTestRouter userTest={userTest} />}
                >
                    <ListItemText
                        primary={<UserTestText userTest={userTest} />}
                        secondary={
                            <span className="list-panel-secondary">
                                <DateRange test={userTest.test} />
                                <UserName user={userTest.test.user} />
                            </span>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}
