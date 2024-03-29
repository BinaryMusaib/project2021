import { IsNotEmpty } from "class-validator"

export class CreateTopicDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    subjectId: number
}
