import { IsNotEmpty } from "class-validator";

export class SubjectStatisticsFilterDto {
    userId?: number;

    subjectId?: number;

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date
}
