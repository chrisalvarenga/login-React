import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { 
  AuthCredentialsDto,
  AuthRegisterDto,
  AuthConfirmCredentialsDto,
  AuthUserOperationDto,
  AuthConfirmPasswordDto
} from './auth.interface';
import { ClaimVerifyRequest } from './verify/verify.interface';
import { AuthService } from './auth.service';
import { VerifyService } from './verify/verify.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verifyService: VerifyService
  ) {}

  @Post('register')
  async register(@Body() AuthRegisterDto: AuthRegisterDto) {
    if (
      AuthRegisterDto.password.length < 8 ||
      !/[a-z]/.test(AuthRegisterDto.password) ||
      !/[A-Z]/.test(AuthRegisterDto.password) ||
      !/[0-9]/.test(AuthRegisterDto.password)
    ) {
      throw new BadRequestException('Password requirements not met.');
    }
    try {
      return await this.authService.register(AuthRegisterDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('authenticate')
  async authenticate(@Body() authenticateRequest: AuthCredentialsDto) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm')
  async confirm(@Body() confirmRequest: AuthConfirmCredentialsDto) {
    try {
      return await this.authService.ConfirmUser(confirmRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('resend-confirm')
  async resendConfirm(@Body() resendRequest: AuthUserOperationDto) {
    try {
      return await this.authService.ResendConfirmation(resendRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordRequest: AuthUserOperationDto) {
    try {
      return await this.authService.ForgotPassword(forgotPasswordRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('confirm-password')
  async confirmPassword(@Body() confirmPasswordRequest: AuthConfirmPasswordDto) {
    try {
      return await this.authService.ConfirmForgotPassword(confirmPasswordRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('verify-token')
  async verifyToken(@Body() claimVerifyRequest: ClaimVerifyRequest) {
    try {
      return await this.verifyService.verifyToken(claimVerifyRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}