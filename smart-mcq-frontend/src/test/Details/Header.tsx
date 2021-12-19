import { Button, Box } from "@mui/material";
import { TestDto } from "../../dto/question";

type HeaderProps = {
    test?: TestDto;
    onClose: () => void;
};

export default function Header({ test, onClose }: HeaderProps) {
    if (test?.closed) return <></>;

    return (
        <Box className="test-details-header">
            <Button
                variant="contained"
                color="primary"
                onClick={() => onClose()}
            >
                Close Test
            </Button>
        </Box>
    );
}
