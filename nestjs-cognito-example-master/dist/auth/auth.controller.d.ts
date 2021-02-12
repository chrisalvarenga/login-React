import { AuthCredentialsDto, AuthRegisterDto, AuthConfirmCredentialsDto, AuthUserOperationDto, AuthConfirmPasswordDto } from './auth.interface';
import { ClaimVerifyRequest } from './verify/verify.interface';
import { AuthService } from './auth.service';
import { VerifyService } from './verify/verify.service';
export declare class AuthController {
    private readonly authService;
    private readonly verifyService;
    constructor(authService: AuthService, verifyService: VerifyService);
    register(AuthRegisterDto: AuthRegisterDto): Promise<unknown>;
    authenticate(authenticateRequest: AuthCredentialsDto): Promise<unknown>;
    confirm(confirmRequest: AuthConfirmCredentialsDto): Promise<unknown>;
    resendConfirm(resendRequest: AuthUserOperationDto): Promise<unknown>;
    forgotPassword(forgotPasswordRequest: AuthUserOperationDto): Promise<unknown>;
    confirmPassword(confirmPasswordRequest: AuthConfirmPasswordDto): Promise<unknown>;
    verifyToken(claimVerifyRequest: ClaimVerifyRequest): Promise<import("./verify/verify.interface").ClaimVerifyResult>;
}
