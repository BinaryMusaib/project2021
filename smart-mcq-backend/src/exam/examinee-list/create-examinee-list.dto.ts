import { ArrayNotEmpty, IsNotEmpty } from "class-validator"
import { CreateExamineeDto } from './create-examinee.dto';

export class CreateExamineeListDto {
    @IsNotEmpty()
    title: string

    description: string

    @ArrayNotEmpty()
    examinees: CreateExamineeDto[];
}
