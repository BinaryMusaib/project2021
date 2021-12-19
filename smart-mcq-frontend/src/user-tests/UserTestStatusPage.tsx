import { Paper, Box, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { UserTestDto } from "../dto/question";
import { testStatusMessage } from "./utils";
import DateRange from "./DateRange";
import AssessmentIcon from "@mui/icons-material/Assessment";
import "./UserTestStatusPage.css";

type UserTestStatusPageProps = {
    userTest: UserTestDto;
};

export default function UserTestStatusPage({
    userTest,
}: UserTestStatusPageProps) {
    return (
        <Layout title="Test Status">
            <Paper className="paper test-status">
                <Box sx={{ display: "flex" }}>
                    <AssessmentIcon fontSize="large" />
                    <Box>
                        <Typography variant="subtitle1">
                            <span>{userTest.test.title}</span>
                        </Typography>
                        <Typography variant="subtitle2">
                            <DateRange test={userTest.test} />
                        </Typography>
                    </Box>
                </Box>
                <hr />
                <Typography variant="body1" className="user-test-message">
                    {testStatusMessage(userTest)}
                </Typography>
            </Paper>
        </Layout>
    );
}
