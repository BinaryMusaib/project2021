
export interface AuthDto {
    email: string
    password: string
}

export interface SignupDto extends AuthDto {
    firstName: string;
    lastName: string;
    confirmPassword: string;
}
