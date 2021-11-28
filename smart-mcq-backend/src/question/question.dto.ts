import { OptionDto } from "./option.dto";
import { QuestionLevel } from "./question-level.dto";
import { TopicDto } from "./topic/topic.dto";

export interface QuestionDto {
    id: number;
    userId: number;
    topics: TopicDto[];
    text: string
    randomize: boolean;
    level: QuestionLevel;
    options: OptionDto[]
}
