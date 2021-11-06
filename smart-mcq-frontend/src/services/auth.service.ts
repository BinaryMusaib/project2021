import Fetch from "./fetch";
import { AuthDto, SetPasswordDto, SignupDto } from "../dto";

export default class AuthService {
    static async authenticate(authDto: AuthDto) {
        return await Fetch.postJSON<void>("/api/user/login", {
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

}
