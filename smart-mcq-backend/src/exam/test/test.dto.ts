import { UserDto } from "src/user/user.dto";
import { CreateTestDto } from "./create-test.dto";

export class TestDto extends CreateTestDto {
    id: number;
    closed: boolean;
    user?: UserDto
    userId: number;
}
