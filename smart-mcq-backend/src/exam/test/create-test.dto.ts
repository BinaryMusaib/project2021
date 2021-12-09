import { IsNotEmpty } from "class-validator"

export class CreateTestDto {

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    startTime: Date

    @IsNotEmpty()
    endTime: Date

    @IsNotEmpty()
    paperId: number

    @IsNotEmpty()
    listId: number

}

