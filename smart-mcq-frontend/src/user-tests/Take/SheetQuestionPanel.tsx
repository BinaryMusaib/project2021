import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    List,
    RadioGroup,
    Box,
} from "@mui/material";
import { AnswerSheetDto, OptionDto } from "../../dto/question";
import React from "react";
import OptionItem from "./OptionItem";

type SheetQuestionPanelProps = {
    sheet: AnswerSheetDto;
    index: number;
    onSelect: (answer: string) => void;
    disabled?: boolean;
};

export default function SheetQuestionPanel({
    sheet,
    index,
    onSelect,
    disabled,
}: SheetQuestionPanelProps) {
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
                avatar={
                    <Avatar sx={{ bgcolor: sheet.isCorrect ? "green" : "red" }}>
                        {index + 1}
                    </Avatar>
                }
                title={sheet.question.text}
            />
            <CardContent>
                <Group>
                    <List disablePadding>
                        {sheet.question.options.map((option, index) => (
                            <OptionItem
                                disabled={disabled}
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
        </Card>
    );
}
