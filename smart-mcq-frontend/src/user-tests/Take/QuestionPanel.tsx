import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    List,
    RadioGroup,
    Box,
    CardActions,
    Button,
} from "@mui/material";
import { AnswerSheetDto, OptionDto } from "../../dto/question";
import React from "react";
import OptionItem from "./OptionItem";
import "./QuestionPanel.css";

type QuestionPanelProps = {
    sheet: AnswerSheetDto;
    index: number;
    questionCount: number;
    onNext: () => void;
    onPrevious: () => void;
    onSelect: (answer: string) => void;
};

export default function QuestionPanel({
    sheet,
    index,
    questionCount,
    onNext,
    onPrevious,
    onSelect,
}: QuestionPanelProps) {
    const [answers, setAnswers] = React.useState<number[]>([]);

    const handleToggle = (option: OptionDto) => {
        const set = new Set<number>(answers);
        if (!sheet.question.multi) set.clear();

        if (set.has(option.id)) set.delete(option.id);
        else set.add(option.id);
        const newAnswers = Array.from(set);
        setAnswers(newAnswers);
        onSelect(newAnswers.join(","));
    };

    React.useEffect(() => {
        setAnswers(
            sheet.answer?.split(",").map((s) => Number.parseInt(s)) ?? [],
        );
    }, [sheet.answer]);

    const Group = sheet.question.multi ? Box : RadioGroup;

    return (
        <Card className="paper question-panel">
            <CardHeader
                avatar={<Avatar>{index + 1}</Avatar>}
                title={sheet.question.text}
            />
            <CardContent>
                <Group>
                    <List disablePadding>
                        {sheet.question.options.map((option, index) => (
                            <OptionItem
                                multi={sheet.question.multi}
                                answers={answers}
                                option={option}
                                key={index}
                                onToggle={handleToggle}
                            />
                        ))}
                    </List>
                </Group>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    disabled={!!answers.length && index === 0}
                    onClick={() => onPrevious()}
                >
                    Previous
                </Button>
                <Button
                    size="small"
                    disabled={!!answers.length && index >= questionCount - 1}
                    onClick={() => onNext()}
                >
                    Next
                </Button>
            </CardActions>
        </Card>
    );
}
