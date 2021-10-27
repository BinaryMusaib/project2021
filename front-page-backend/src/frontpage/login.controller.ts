import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginData } from './login-data.dto';
import { LoginService } from './login.service';

@Controller('api/login')
export class LoginController {

    constructor(private loginService: LoginService) {}

    @Post()
    authenticate(@Body() loginData: LoginData) {
        if (this.loginService.authenticate(loginData)){
            return {
                message: 'You are authorized',
            };
        }
        throw new BadRequestException();
    }
}
