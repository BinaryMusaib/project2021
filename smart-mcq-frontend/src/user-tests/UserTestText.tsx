import { UserTestDto } from "../dto/question";
import { testStatus } from "./utils";

type UserTestTextProps = {
    userTest: UserTestDto;
};

export default function UserTestText({ userTest }: UserTestTextProps) {
    return (
        <div className="user-test-text">
            <span>
                {userTest.test.title} -{" "}
                <span className="test-status">{testStatus(userTest)}</span>
            </span>
        </div>
    );
}
