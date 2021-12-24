import { IsNotEmpty } from "class-validator";

export class SubjectStatisticsFilterDto {
    userId?: number;

    @IsNotEmpty()
    subjectId: number;

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date
}
