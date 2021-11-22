import { CreateOptionDto } from "./create-options.dto";

export interface UpdateOptionDto extends CreateOptionDto {
    id?: number;
}
