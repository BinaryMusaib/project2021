import { Role } from "./role.enum"

export class UpdateUserDto {
    role: Role
    isActive: boolean
}
