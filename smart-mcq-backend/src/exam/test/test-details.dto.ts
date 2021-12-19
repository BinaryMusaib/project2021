import { QuestionPaperDto } from "src/question/question-paper/question-paper.dto";
import { CreateTestDto } from "./create-test.dto";

export class TestDetailsDto extends CreateTestDto {
    id: number;
    closed: boolean;
    paper?: QuestionPaperDto
}
