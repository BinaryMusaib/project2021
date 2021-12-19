import { UserTestDto, UserTestLightDto } from "../dto/question";
import { isAfter, isBefore } from "date-fns";

export enum UserTestStatus {
    NotStarted = "Not Started",
    InProgress = "In Progress",
    Finished = "Finished",
    Closed = "Closed",
    Missed = "Missed",
}

export function userTestStatus(userTest: UserTestLightDto) {
    if (userTest.finished) return UserTestStatus.Finished;

    if (!userTest.startTime) return UserTestStatus.NotStarted;

    return UserTestStatus.InProgress;
}

export function testStatus(userTest: Omit<UserTestDto, "sheets">) {
    const now = new Date();

    if (userTest.test.closed) return UserTestStatus.Closed;
    if (userTest.finished) return UserTestStatus.Finished;

    if (isBefore(now, userTest.test.startTime))
        return UserTestStatus.NotStarted;

    if (isAfter(now, userTest.test.endTime))
        return userTest.startTime
            ? UserTestStatus.Closed
            : UserTestStatus.Missed;

    return userTest.endTime && isAfter(now, userTest.endTime)
        ? UserTestStatus.Finished
        : UserTestStatus.InProgress;
}

export function testStatusMessage(statusOrTest: UserTestStatus | UserTestDto) {
    const status =
        typeof statusOrTest === "string"
            ? (statusOrTest as UserTestStatus)
            : testStatus(statusOrTest);

    switch (status) {
        case UserTestStatus.NotStarted:
            return "The test as not yet started";

        case UserTestStatus.InProgress:
            return "The test is in progress.";

        case UserTestStatus.Closed:
            return "The test has closed.";

        case UserTestStatus.Finished:
            return "The test has already finished";

        case UserTestStatus.Missed:
            return "Sorry you have missed the test.It is closed now";
    }
}
