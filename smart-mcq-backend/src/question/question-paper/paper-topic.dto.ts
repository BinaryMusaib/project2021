import { TopicDto } from "../topic/topic.dto";
import { CreatePaperTopicDto } from "./create-paper-topic.dto";

export class PaperTopicDto extends CreatePaperTopicDto {
    id: number;
    topic?: TopicDto
}


