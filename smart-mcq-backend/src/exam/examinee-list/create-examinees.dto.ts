import { IsNotEmpty } from "class-validator"

export class CreateExamineesDto {
    @IsNotEmpty()
    emails: string[]
}