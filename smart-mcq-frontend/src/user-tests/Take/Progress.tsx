import { LinearProgress, Box, Typography } from "@mui/material";
import { AnswerSheetDto } from "../../dto/question";

type ProgressProps = {
    sheets: AnswerSheetDto[];
};

export default function Progress({ sheets }: ProgressProps) {
    const done = sheets.filter((s) => s.answer).length;
    const total = sheets.length;
    const progress = Math.floor(done / total) * 100;

    return (
        <Box className="user-test-progress">
            <Box>
                Questions Done: {done} /{total}
            </Box>
            <Box className="progress-bar">
                <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                        {`${progress}%`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
