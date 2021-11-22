import { OptionDto } from "./option.dto";
import { TopicDto } from "./topic/topic.dto";

export interface QuestionDto {
    id: number;
    userId: number;
    topics: TopicDto[];
    text: string
    options: OptionDto[]
}
