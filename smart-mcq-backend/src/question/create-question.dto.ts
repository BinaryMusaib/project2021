import { IsNotEmpty, IS_ALPHANUMERIC } from "class-validator"

export class CreateQuestionDto {

    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    topicId: number

    @IsNotEmpty()
    answer: number
}