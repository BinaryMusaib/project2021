import {
    BadRequestException,
    Body,
    Controller,
    Param,
    Post,
    Get,
} from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { AuthDataDto } from './auth-data.dto';
import { CreateUserDto } from './create-user.dto';
import { SetPasswordDto } from './set-password.dto';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { ResetPasswordRequestDto } from './reset-password-request.dto';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService, 
        private mailService: MailService,
        private configService: ConfigService)
         { }

    @Post('login')
    async login(@Body() authData: AuthDataDto) {
        const user = await this.userService.authenticate(authData);
        if (!user) throw new BadRequestException('Invalid username or password');
        return user;
    }

    @Post('signup')
    async signup(@Body() userDto: CreateUserDto) {
        if (await this.userService.findByEmail(userDto.email))
            throw new BadRequestException('email already exists');

        try {
            const user = await this.userService.create(userDto);
            await this.mailService.sendUserConfirmation(
                userDto,
                this.generateSetPasswordLink(user));
        } catch (error) {
            console.log(error);
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
    async setPassword(@Body() dto: SetPasswordDto) {
        if (!await this.userService.setPassword(dto))
            throw new BadRequestException();
    }

    @Post('reset-password-request')
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

    @Get('me/:email')
    async me(@Param('email') email: string) {
        return await this.userService.findByEmail(email);
    }
}
