import { IsNotEmpty } from "class-validator";

export class SetAnswerDto {

    @IsNotEmpty()
    answerSheetId: number;

    @IsNotEmpty()
    answer: string;

}
