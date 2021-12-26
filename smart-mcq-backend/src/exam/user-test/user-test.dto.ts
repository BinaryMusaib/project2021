import { TestDto } from "../test/test.dto";
import { AnswerSheetDto } from "./answer-sheet.dto";

export class UserTestDto {
    id: number;

    userId: number;

    test: TestDto;

    startTime?: Date

    endTime?: Date

    sheets?: AnswerSheetDto[]

    finished: boolean;

    marks: number;

    totalMarks: number;

}
