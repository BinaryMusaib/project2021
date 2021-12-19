import { useParams } from "react-router-dom";
import React from "react";
import { TopicDto, UserTestDetailsDto } from "../../dto/question";
import UserTestService from "../../services/user-test.service";
import { FetchContext } from "../../context";
import LoadingPage from "../../components/LoadingPage";
import Layout from "../../components/Layout";
import Header from "./Header";
import Summary from "./Summary";
import TopicService from "../../services/topic.service";
import { Box } from "@mui/material";
import SheetPanel from "../Take/SheetPanel";
import "./index.css";

export default function UserTestDetails() {
    const [userTestDetails, setUserTestDetails] =
        React.useState<UserTestDetailsDto>();
    const { id } = useParams<{ id: string }>();
    const { whileLoading } = React.useContext(FetchContext);

    React.useEffect(() => {
        const userTestId = Number.parseInt(id);
        if (!Number.isNaN(userTestId))
            whileLoading(
                UserTestService.getUserTestDetails(userTestId).then((res) =>
                    setUserTestDetails(res.body!),
                ),
            );
    }, [id]);

    if (!userTestDetails) return <LoadingPage />;

    return (
        <Layout title={userTestDetails.test.title}>
            <Header details={userTestDetails} />
            <Box className="user-test-details">
                <Summary
                    results={userTestDetails.results}
                    topics={userTestDetails.test.paper.paperTopics}
                />
                <SheetPanel
                    sheets={userTestDetails.sheets}
                    onSelect={() => { }}
                    disabled={true}
                />
            </Box>
        </Layout>
    );
}
