import { UserDto } from "src/user/user.dto";
import { TestDetailsDto } from "../test/test-details.dto";
import { ResultDto } from "./result.dto";
import { UserTestDto } from "./user-test.dto";

export class UserTestDetailsDto extends UserTestDto {
    results: ResultDto[];
    user: UserDto;
    test: TestDetailsDto;
}
