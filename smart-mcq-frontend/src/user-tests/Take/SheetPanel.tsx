import {AnswerSheetDto} from "../../dto/question";
import {Box} from "@mui/material";
import SheetQuestionPanel from "./SheetQuestionPanel";

type SheetPanelProps = {
    sheets: AnswerSheetDto[];
    onSelect: (index: number, answer: string) => void;
    disabled?: boolean;
};

export default function SheetPanel({
    sheets,
    disabled,
    onSelect,
}: SheetPanelProps) {
    return (
        <Box className="sheet-panel">
            {sheets.map((sheet, index) => (
                    <SheetQuestionPanel
                    sheet={sheet}
                    key={index}
                    index={index}
                    disabled={disabled}
                    onSelect={(answer) => onSelect(index, answer)}
                />
            ))}
        </Box>
    );
}
