import {
    Checkbox,
    Radio,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { OptionDto } from "../../dto/question";

type OptionItemProps = {
    multi: boolean;
    answers: number[];
    option: OptionDto;
    onToggle: (option: OptionDto) => void;
    disabled?: boolean;
};

export default function OptionItem({
    multi,
    answers,
    option,
    onToggle,
    disabled = false,
}: OptionItemProps) {
    const label = `question-checkbox-${option.id}`;
    return (
        <ListItem disablePadding>
            <ListItemButton
                sx={{ color: getColor(option, answers) }}
                disabled={disabled}
                role={undefined}
                onClick={() => onToggle(option)}
                dense
            >
                <ListItemIcon>
                    {multi ? (
                        <Checkbox
                            disabled={disabled}
                            edge="start"
                            checked={answers.includes(option.id)}
                            inputProps={{
                                "aria-labelledby": label,
                            }}
                        />
                    ) : (
                        <Radio
                            disabled={disabled}
                            edge="start"
                            checked={answers.includes(option.id)}
                            inputProps={{
                                "aria-labelledby": label,
                            }}
                        />
                    )}
                </ListItemIcon>
                <ListItemText id={label} primary={option.text} />
            </ListItemButton>
        </ListItem>
    );
}

function getColor(option: OptionDto, answers: number[]) {
    if (!answers.includes(option.id) && option.isCorrect) return "green";
    else if (answers.includes(option.id) && !option.isCorrect) return "red";
    else return undefined;
}
