import { ArrayNotEmpty } from "class-validator";
import { UserDto } from "src/user/user.dto";
import { CreateExamineeListDto } from "./create-examinee-list.dto";

export class ExamineeListDto extends CreateExamineeListDto {
    id: number;

    @ArrayNotEmpty()
    examinees: UserDto[];
}

