import { CreateQuestionPaperDto } from "./create-question-paper.dto";
import { UpdatePaperTopicDto } from "./update-paper-topic.dto";

export class UpdateQuestionPaperDto extends CreateQuestionPaperDto {
    paperTopics: UpdatePaperTopicDto[];
}
