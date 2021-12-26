import { ResultDto } from "./result.dto";

interface UserTestDto {
    id: number;
    userId: number;
    startTime?: Date
    endTime?: Date
    finished: boolean;
    marks: number;
    totalMarks: number;
}


export class TestResultDto extends ResultDto {
    userTest?: UserTestDto;
}
