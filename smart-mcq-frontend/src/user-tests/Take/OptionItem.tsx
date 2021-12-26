import {
    Checkbox,
    Radio,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Colors } from "../../colors";
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
    if (option.isCorrect === undefined) return undefined;
    if (!answers.includes(option.id))
        return option.isCorrect ? Colors.Error : undefined;
    else return option.isCorrect ? Colors.Correct : Colors.Error;
}
