import { Box, Chip } from "@mui/material";

type GrandSummaryProps = {
    userTest: {
        marks: number;
        totalMarks: number;
    };
};

export default function GrandSummary({
    userTest: { marks, totalMarks },
}: GrandSummaryProps) {
    return (
        <Box>
            <Chip
                label={`Result : ${marks} / ${totalMarks}`}
                variant="outlined"
                color="secondary"
            />
        </Box>
    );
}
