import Fetch from "./fetch";
import { AuthDto, AuthenticationDto, ResetPasswordRequestDto, SetPasswordDto, SignupDto } from "../dto";
import StorageService from "./storage.services";

export default class AuthService {
    static async authenticate(authDto: AuthDto) {
        return await Fetch.postJSON<AuthenticationDto>("/api/user/login", {
            body: authDto,
        });
    }

    static async signup(signupDto: SignupDto) {
        return await Fetch.postJSON<void>("/api/user/signup", {
            body: signupDto
        });
    }

    static async setPassword(setPasswordDto: SetPasswordDto) {
        return await Fetch.postJSON<void>("/api/user/set-password", {
            body: setPasswordDto
        });
    }

    static async resetPasswordRequest(dto: ResetPasswordRequestDto) {
        return await Fetch.postJSON<void>('/api/user/reset-password-request', {
            body: dto
        });
    }

    static logout() {
        StorageService.clear();
    }
}

