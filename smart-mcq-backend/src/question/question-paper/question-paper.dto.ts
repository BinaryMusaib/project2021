import { PaperTopicDto } from "./paper-topic.dto";

export class QuestionPaperDto {
    id: number;
    title: string;
    duration: number;
    paperTopics: PaperTopicDto[]
}
