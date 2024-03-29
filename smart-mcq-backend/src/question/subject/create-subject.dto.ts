import { IsNotEmpty } from "class-validator"

export class CreateSubjectDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
}
