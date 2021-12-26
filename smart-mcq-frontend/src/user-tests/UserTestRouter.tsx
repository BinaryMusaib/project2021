import Fab from "@mui/material/Fab";
import PlayIcon from "@mui/icons-material/PlayArrow";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MissedIcon from "@mui/icons-material/CallMissed";
import DoneIcon from "@mui/icons-material/Done";
import { useHistory } from "react-router-dom";
import { UserTestDto } from "../dto/question";
import { testStatus, UserTestStatus } from "./utils";

type UserRouterProps = {
    userTest: UserTestDto;
};

export default function UserTestRouter({ userTest }: UserRouterProps) {
    const { route, color, icon } = selectRoute(userTest);
    const history = useHistory();
    return (
        <Fab
            color={color}
            size="small"
            disabled={!route}
            onClick={() => history.push(`${route}/${userTest.id}`)}
        >
            {icon}
        </Fab>
    );
}

type Route = {
    route?: string;
    color: "primary" | "secondary" | "default";
    icon: React.ReactElement;
};

function selectRoute(userTest: UserTestDto): Route {
    const status = testStatus(userTest);
    switch (status) {
        case UserTestStatus.InProgress:
            return {
                route: "/user-test/take",
                color: "primary",
                icon: <PlayIcon />,
            };

        case UserTestStatus.Closed:
            return {
                route: "/user-test/details",
                color: "secondary",
                icon: <AssessmentIcon />,
            };

        case UserTestStatus.NotStarted:
            return {
                color: "default",
                icon: <PlayIcon />,
            };

        case UserTestStatus.Missed:
            return {
                color: "secondary",
                icon: <MissedIcon />,
            };

        case UserTestStatus.Finished:
            return {
                color: "primary",
                icon: <DoneIcon />,
            };
    }
}
