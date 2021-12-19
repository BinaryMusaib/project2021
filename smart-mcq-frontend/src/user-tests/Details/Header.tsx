import { UserTestDetailsDto } from "../../dto/question";
import { Box } from "@mui/material";
import GrandSummary from "./GrandSummary";

type HeaderProps = {
    details: UserTestDetailsDto;
};

export default function Header({
    details: { test, user, ...userTest },
}: HeaderProps) {
    return (
        <Box className="user-test-details-header">
            <Box className="user-test-details-name">
                {user.firstName} {user.lastName} ({user.email})
            </Box>
            <GrandSummary userTest={userTest} />
        </Box>
    );
}
