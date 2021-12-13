import { IsNotEmpty } from "class-validator"

export class UserTestFilterDto {

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;
}
