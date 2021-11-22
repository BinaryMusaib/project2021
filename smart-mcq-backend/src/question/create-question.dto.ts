import { ArrayNotEmpty, IsArray, IsNotEmpty } from "class-validator"
import { CreateOptionDto } from "./create-options.dto"

export class CreateQuestionDto {
    @IsNotEmpty()
    text: string

    @IsNotEmpty()
    topics: number[]

    @IsArray()
    @ArrayNotEmpty()
    options: CreateOptionDto[]
}
