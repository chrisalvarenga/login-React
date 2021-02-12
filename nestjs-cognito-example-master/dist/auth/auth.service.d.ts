import { AuthCredentialsDto, AuthRegisterDto, AuthConfirmCredentialsDto, AuthUserOperationDto, AuthConfirmPasswordDto } from './auth.interface';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private configService;
    private userPool;
    constructor(configService: ConfigService);
    get secretKey(): string;
    register(authRegisterRequest: AuthRegisterDto): Promise<unknown>;
    authenticateUser(user: AuthCredentialsDto): Promise<unknown>;
    ConfirmUser(user: AuthConfirmCredentialsDto): Promise<unknown>;
    ResendConfirmation(user: AuthUserOperationDto): Promise<unknown>;
    ForgotPassword(user: AuthUserOperationDto): Promise<unknown>;
    ConfirmForgotPassword(user: AuthConfirmPasswordDto): Promise<unknown>;
}
