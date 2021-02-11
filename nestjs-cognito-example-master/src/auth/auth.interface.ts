export interface AuthRegisterDto {
    email: string;
    password: string;
}

export interface AuthCredentialsDto {
    password: string;
    name: string;
}

export interface AuthConfirmCredentialsDto {
    code: string;
    name: string;
}

export interface AuthUserOperationDto {
    name: string;
}

export interface AuthConfirmPasswordDto {
    name: string;
    password: string;
    code: string;
}