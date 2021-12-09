import { IsNotEmpty } from "class-validator"

export class UpdateTestDto {

    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    startTime: Date

    @IsNotEmpty()
    endTime: Date

}

