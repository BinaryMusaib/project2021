import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDataDto } from './auth-data.dto';
import { CreateUserDto } from './create-user.dto';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService){}

    async create(userDto: CreateUserDto): Promise<UserDto>{
        return await this.prisma.user.create({
            data: userDto
        });
    }

    async findByEmail(email: string): Promise<UserDto> {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }

    async authenticate(authData: AuthDataDto): Promise<UserDto> {
        return await this.prisma.user.findFirst({
            where: { email: authData.email, password: authData.password}
        });
    }
}