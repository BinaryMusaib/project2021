import { QuestionDto } from "src/question/question.dto";

export class AnswerSheetDto {
    question: QuestionDto;
    answer?: string;
    mark?: number;
    isCorrect?: boolean;
}
