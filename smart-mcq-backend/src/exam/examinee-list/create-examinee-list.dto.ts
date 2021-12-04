import { ArrayNotEmpty, IsNotEmpty } from "class-validator"

export class CreateExamineeListDto {
    @IsNotEmpty()
    title: string

    description: string

    @ArrayNotEmpty()
    examinees: string[]
}
