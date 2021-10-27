import { BadRequestException, Body, Controller, Param, Post, Get } from '@nestjs/common';
import { AuthDataDto } from './auth-data.dto';
import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Post('login')
    async login(@Body() authData: AuthDataDto) {
        const user = await this.userService.authenticate(authData);
        if (!user)
            throw new BadRequestException();
        return user;
    }

    @Post('signup')
    async signup(@Body() userDto: CreateUserDto) {
        try {
            return await this.userService.create(userDto);
        } catch (error) {
            throw new BadRequestException("email already exist");
        }
    }

    @Get("me/:email")
    async me(@Param("email") email: string) {
        return await this.userService.findByEmail(email);
    }

}
