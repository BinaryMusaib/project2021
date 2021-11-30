import { IsNotEmpty, Min } from "class-validator";
import { QuestionLevel } from "../question-level.dto";

export class CreatePaperTopicDto {
    @IsNotEmpty()
    topicId: number

    @IsNotEmpty()
    level: QuestionLevel

    @Min(1)
    numberOfQuestions: number
}

