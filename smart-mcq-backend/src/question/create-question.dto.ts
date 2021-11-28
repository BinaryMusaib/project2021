import { ArrayNotEmpty, IsArray, IsNotEmpty } from "class-validator"
import { CreateOptionDto } from "./create-options.dto"
import { QuestionLevel } from "./question-level.dto"

export class CreateQuestionDto {
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    topics: number[]

    @IsArray()
    @ArrayNotEmpty()
    options: CreateOptionDto[]

    randomize: boolean;

    level: QuestionLevel
}
