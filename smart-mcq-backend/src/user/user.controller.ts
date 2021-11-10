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
import { ResetPasswordRequestDto } from './reset-password-request.dto';

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
        return `${req.protocol}://${req.hostname}:3000/set-password/` +
            `${user.otp}?email=${encodeURIComponent(user.email)}`;
    }

    @Post('set-password')
    async setPassword(@Body() dto: SetPasswordDto) {
        if (!await this.userService.setPassword(dto))
            throw new BadRequestException();
    }

    @Post('reset-password-request')
    async resetPasswordRequest(@Request() req: express.Request,
        @Body() dto: ResetPasswordRequestDto) {
        const user = await this.userService.resetPasswordRequest(dto);
        if (user != null)
            await this.mailService.sendUserConfirmation(
                user,
                this.generateSetPasswordLink(user, req));

    }

    @Get('me/:email')
    async me(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }
}
