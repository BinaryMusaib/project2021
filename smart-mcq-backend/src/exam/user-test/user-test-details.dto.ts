import { UserDto } from "src/user/user.dto";
import { TestDetailsDto } from "../test/test-details.dto";
import { AnswerSheetDto } from "./answer-sheet.dto";
import { ResultDto } from "./result.dto";

export class UserTestDetailsDto {
    id: number;

    userId: number;

    startTime?: Date

    endTime?: Date

    sheets?: AnswerSheetDto[]

    finished: boolean;

    marks: number;

    totalMarks: number;

    results: ResultDto[];

    user: UserDto;

    test: TestDetailsDto;
}
