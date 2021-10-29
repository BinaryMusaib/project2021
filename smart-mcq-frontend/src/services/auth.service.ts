import Fetch from "./fetch";
import { AuthDto, SignupDto } from "../dto";

export default class AuthService {
    static async authenticate(authDto: AuthDto) {
        return await Fetch.postJSON<void>("/api/user/login", {
            body: authDto,
        });
    }

    static async signup({ confirmPassword, ...signupDto }: SignupDto) {
        return await Fetch.postJSON<void>("/api/user/signup", {
            body: signupDto
        });
    }
}
