import { PaperTopicDto } from "./paper-topic.dto";

export class QuestionPaperDto {
    title: string;
    duration: number;
    paperTopics: PaperTopicDto[]
}
