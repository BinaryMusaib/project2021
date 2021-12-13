
export interface AuthDto {
    email: string
    password: string
}

export interface SignupDto {
    email: string
    firstName: string;
    lastName: string;
}

export interface SetPasswordDto {
    otp: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface ResetPasswordRequestDto {
    email: string
}

export interface AuthenticationDto {
    accessToken: string;
}

export interface AuthProfile {
    email: string;
    firstName: string;
    lastName: string;
    sub: number
    role: string
}

export interface UserDto {
    id: number
    email: string
    firstName: string
    lastName: string
    isActive: boolean
    role: string
}

export interface UpdateUserDto {
    role: string
    isActive: boolean
}

