import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDataDto } from './auth-data.dto';
import { CreateUserDto } from './create-user.dto';
import { ResetPasswordRequestDto } from './reset-password-request.dto';
import { SetPasswordDto } from './set-password.dto';
import { UserDto } from './user.dto';

const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

@Injectable()
export class UserService {

    private static SALT_ROUNDS = 10;
    private static _10Days = 1000 * 60 * 60 * 24 * 10;

    constructor(private prisma: PrismaService) { }

    async create(userDto: CreateUserDto): Promise<UserDto> {
        const otp = randomstring.generate();
        const user = await this.prisma.user.create({
            data: {
                ...userDto,
                otp: await bcrypt.hash(otp, UserService.SALT_ROUNDS),
                otpExpiry: new Date(new Date().getTime() + UserService._10Days),
            }
        });

        return {
            ...user,
            otp
        };
    }

    async setPassword(dto: SetPasswordDto): Promise<boolean> {
        const user = await this.findByEmail(dto.email);
        if (user != null) {
            if (await bcrypt.compare(dto.otp, user.otp)
                && !this.isExpired(user.otpExpiry)) {
                await this._setPassword(dto);
                return true;
            }
        }
        return false;
    }

    private isExpired(date?: Date): boolean {
        if (!date) return true;
        return date.getTime() < new Date().getTime();
    }

    private async _setPassword(dto: SetPasswordDto): Promise<void> {
        await this.prisma.user.update({
            where: {
                email: dto.email
            },
            data: {
                password: await bcrypt.hash(dto.password, UserService.SALT_ROUNDS),
                otp: null,
                otpExpiry: null
            }
        });
    }

    async resetPasswordRequest(dto: ResetPasswordRequestDto): Promise<UserDto> {
        const otp = randomstring.generate();
        const user = await this.prisma.user.update({
            where: {
                email: dto.email
            },
            data: {
                otp: await bcrypt.hash(otp, UserService.SALT_ROUNDS),
                otpExpiry: new Date(new Date().getTime() + UserService._10Days),
            }
        });

        return {
            ...user,
            otp
        };
    }

    async findByEmail(email: string): Promise<UserDto> {
        return await this.prisma.user.findUnique({
            where: { email }
        })
    }

    async authenticate(authData: AuthDataDto): Promise<UserDto> {
        const user = await this.prisma.user.findUnique({
            where: { email: authData.email }
        });

        if (user?.password &&
            await bcrypt.compare(authData.password, user?.password))
            return user;
        else
            return null;
    }
}
