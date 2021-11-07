import {
    BadRequestException,
    Body,
    Controller,
    Param,
    Post,
    Get,
    Request
} from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { AuthDataDto } from './auth-data.dto';
import { CreateUserDto } from './create-user.dto';
import { SetPasswordDto } from './set-password.dto';
import { UserService } from './user.service';
import express from 'express';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService, private mailService: MailService) { }

    @Post('login')
    async login(@Body() authData: AuthDataDto) {
        const user = await this.userService.authenticate(authData);
        if (!user) throw new BadRequestException();
        return user;
    }

    @Post('signup')
    async signup(@Body() userDto: CreateUserDto, @Request() req: express.Request) {
        if (await this.userService.findByEmail(userDto.email))
            throw new BadRequestException('email already exists');

        try {
            const user = await this.userService.create(userDto);
            await this.mailService.sendUserConfirmation(
                userDto,
                this.generateSetPasswordLink(user, req));
        } catch (error) {
            console.log(error);
            throw new BadRequestException(
                'Sorry. Unable to create your user at this time.'
            );
        }
    }

    generateSetPasswordLink(user: UserDto, req: express.Request) {
        return `${req.protocol}://${req.baseUrl}/set-password/` +
            `${user.otp}?email=${encodeURIComponent(user.email)}`;
    }

    @Post('set-password')
    async setPassword(@Body() dto: SetPasswordDto) {
        try {
            const user = await this.userService.findByEmail(dto.email);
            if (user.otp === dto.otp && this.isExpired(user.otpExpiry)) {
                this.userService.setPassword(dto);
                return;
            } else
                throw new BadRequestException();
        } catch (error) {
            throw new BadRequestException('Invalid link');
        }
    }

    isExpired(date?: Date): boolean {
        if (!date) return false;
        return date.getTime() > new Date().getTime();
    }

    @Get('me/:email')
    async me(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }
}
