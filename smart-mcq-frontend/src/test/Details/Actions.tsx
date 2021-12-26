import { IconButton, Box } from "@mui/material";
import { TestUserTestDto } from "../../dto/question";
import DetailsIcon from "@mui/icons-material/Info";
import { useHistory } from "react-router-dom";

type ActionsProps = {
    userTest: TestUserTestDto;
};

export default function Actions({ userTest }: ActionsProps) {
    const history = useHistory();
    const toDetails = () => history.push(`/user-test/details/${userTest.id}`);
    return (
        <Box>
            <IconButton onClick={toDetails}>
                <DetailsIcon color="primary" />
            </IconButton>
        </Box>
    );
}
