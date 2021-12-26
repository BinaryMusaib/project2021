import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
} from "@mui/material";
import { Colors } from "../../colors";
import { PaperTopicDto, ResultDto } from "../../dto/question";

type SummaryProps = {
    results: ResultDto[];
    topics: PaperTopicDto[];
};

export default function Summary({ results, topics }: SummaryProps) {
    return (
        <Paper className="paper user-test-summary-paper">
            <List>
                {results.map((result, index) => {
                    const paperTopic = topics.find(
                        (pt) => pt.id === result.topicId,
                    );
                    return (
                        <ListItem key={index}>
                            <ListItemText
                                primary={paperTopic?.topic?.title}
                                secondary={`${result.marks} / ${result.totalMarks}`}
                            />
                            <ListItemAvatar>
                                <Avatar
                                    sx={{ fontSize: 12, bgcolor: Colors.Primary }}
                                >
                                    {percentage(result)}%
                                </Avatar>
                            </ListItemAvatar>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

function percentage(result: ResultDto) {
    return Math.floor((result.marks * 100) / result.totalMarks ?? 1);
}
