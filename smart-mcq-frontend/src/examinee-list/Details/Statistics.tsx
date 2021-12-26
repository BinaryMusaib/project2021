import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import SubjectStatistics from "../../SubjectStatistics";
import React from "react";

export default function ExamineeStatistics() {
    const { userId: userIdAsString } = useParams<{ userId: string }>();

    const userId = React.useMemo<number>(
        () => Number.parseInt(userIdAsString),
        [userIdAsString],
    );

    if (!userId || Number.isNaN(userId)) return <LoadingPage />;

    return <SubjectStatistics userId={userId} mentorView />;
}
