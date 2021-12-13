import { TestDto } from "../test/test.dto";

export class UserTestDto {
    id: number;

    userId: number;

    test: TestDto;

    startTime?: Date

    endTime?: Date
}
