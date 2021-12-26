import { PaperTopicDto } from "src/question/question-paper/paper-topic.dto";
import { CreateResultDto } from "./create-result.dto";

export class ResultDto extends CreateResultDto {
    createdAt: Date
    topic?: PaperTopicDto;
}
