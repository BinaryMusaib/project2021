import { Button, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { TestDto } from "../../dto/question";

type HeaderProps = {
    test?: TestDto;
    onClose: () => void;
};

export default function Header({ test, onClose }: HeaderProps) {
    const history = useHistory();
    return (
        <Box className="test-details-header">
            {!test?.closed ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onClose()}
                >
                    Close Test
                </Button>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => history.push(`/test/statistics/${test?.id}`)}
                >
                    Statistics
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/tests`)}
            >
                Back
            </Button>
        </Box>
    );
}
