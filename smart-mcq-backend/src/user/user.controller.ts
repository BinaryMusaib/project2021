import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Put,
    Post,
    Request,
    UseGuards,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateUserDto } from './create-user.dto';
import { SetPasswordDto } from './set-password.dto';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ResetPasswordRequestDto } from './reset-password-request.dto';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Public } from './public';
import express from 'express';
import { UpdateUserDto } from './update-user.dto';
import { Roles } from './role.decorator';
import { Role } from './role.enum';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private mailService: MailService,
        private configService: ConfigService) { }

    @Post('login')
    @Public()
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: express.Request) {
        return {
            accessToken: this.jwtService.sign(this.toPayLoad(req.user as any))
        };
    }

    toPayLoad(user: UserDto) {
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            sub: user.id,
            role: user.role
        };
    }

    @Post('signup')
    @Public()
    async signup(@Body() userDto: CreateUserDto) {
        if (await this.userService.findByEmail(userDto.email))
            throw new BadRequestException('email already exists');

        try {
            const user = await this.userService.create(userDto);
            await this.mailService.sendUserConfirmation(
                userDto,
                this.generateSetPasswordLink(user));
        } catch (error) {
            throw new BadRequestException(
                'Sorry. Unable to create your user at this time.'
            );
        }
    }

    generateSetPasswordLink(user: UserDto) {
        return `${this.configService.get<string>("baseUri")}set-password/` +
            `${user.otp}?email=${encodeURIComponent(user.email)}`;
    }

    @Post('set-password')
    @Public()
    async setPassword(@Body() dto: SetPasswordDto) {
        if (!await this.userService.setPassword(dto))
            throw new BadRequestException();
    }

    @Post('reset-password-request')
    @Public()
    async resetPasswordRequest(
        @Body() dto: ResetPasswordRequestDto) {
        const user = await this.userService.resetPasswordRequest(dto);
        if (user != null)
            await this.mailService.sendUserConfirmation(
                user,
                this.generateSetPasswordLink(user));
        else
            throw new BadRequestException();

    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async getUsers() {
        return await this.userService.getAll();
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto) {
        return await this.userService.update(id, dto);
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.getById(id);
    }

}
