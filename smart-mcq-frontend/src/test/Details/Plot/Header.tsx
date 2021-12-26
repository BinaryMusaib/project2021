import { Button, Box } from "@mui/material";
import { useHistory } from "react-router-dom";
import { TestDto } from "../../../dto/question";

type HeaderProps = {
    test: TestDto;
};

export default function Header({ test }: HeaderProps) {
    const history = useHistory();

    return (
        <Box className="test-details-header">
            <Button
                variant="contained"
                color="primary"
                onClick={() => history.push(`/test/details/${test.id}`)}
            >
                Back
            </Button>
        </Box>
    );
}
