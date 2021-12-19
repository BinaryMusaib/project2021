import { UserTestDto } from "../../dto/question";
import { LinearProgress } from "@mui/material";

type TimerProps = {
    userTest: UserTestDto;
};

export default function Timer({ userTest: { startTime, endTime } }: TimerProps) {
    const timeRemaining = Math.floor(
        (endTime!.valueOf() - new Date().valueOf()) / 60000,
    );

    const duration = Math.floor(
        (endTime!.valueOf() - startTime!.valueOf()) / 60000,
    );

    const progress = Math.floor(((duration - timeRemaining) * 100) / duration);
    return (
        <span className="timer">
            <span>{timeRemaining} mins remaining</span>
            <span>(Total Time: {duration} mins)</span>
            <LinearProgress
                color="secondary"
                value={progress}
                variant="determinate"
            />
        </span>
    );
}
