import { CreateQuestionDto } from "./create-question.dto";
import { UpdateOptionDto } from "./update-option.dto";

export interface UpdateQuestionDto extends CreateQuestionDto {
    options: UpdateOptionDto[]
}
