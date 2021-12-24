import { IsNotEmpty } from "class-validator";

export class TopicStatisticFilterDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    topicId: number;

    @IsNotEmpty()
    startTime: Date;

    @IsNotEmpty()
    endTime: Date
}
