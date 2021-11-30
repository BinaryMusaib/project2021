import { ArrayNotEmpty, IsNotEmpty, Min } from "class-validator";
import { CreatePaperTopicDto } from "./create-paper-topic.dto";

export class CreateQuestionPaperDto {
    @IsNotEmpty()
    title: string

    @ArrayNotEmpty()
    paperTopics: CreatePaperTopicDto[];

    @Min(10)
    duration: number
}
