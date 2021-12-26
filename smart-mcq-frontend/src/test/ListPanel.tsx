import { TestDto } from "../dto";
import { List, ListItem, ListItemText, Fab } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DateRange from "../user-tests/DateRange";

type TestListPanelProps = {
    tests: TestDto[];
};

export default function TestListPanel({ tests }: TestListPanelProps) {
    const history = useHistory();

    return (
        <List>
            {tests.map((test, index) => (
                <ListItem
                    key={index}
                    secondaryAction={
                        <Fab
                            color="primary"
                            aria-label="edit"
                            size="small"
                            onClick={() => history.push(`test/${test.id}`)}
                        >
                            <EditIcon />
                        </Fab>
                    }
                >
                    <ListItemText
                        primary={
                            <Link to={`/test/details/${test.id}`}>
                                {test.title}
                            </Link>
                        }
                        secondary={<DateRange test={test} />}
                    />
                </ListItem>
            ))}
        </List>
    );
}
