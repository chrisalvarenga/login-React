"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const verify_service_1 = require("./verify/verify.service");
let AuthController = class AuthController {
    constructor(authService, verifyService) {
        this.authService = authService;
        this.verifyService = verifyService;
    }
    async register(AuthRegisterDto) {
        if (AuthRegisterDto.password.length < 8 ||
            !/[a-z]/.test(AuthRegisterDto.password) ||
            !/[A-Z]/.test(AuthRegisterDto.password) ||
            !/[0-9]/.test(AuthRegisterDto.password)) {
            throw new common_1.BadRequestException('Password requirements not met.');
        }
        try {
            return await this.authService.register(AuthRegisterDto);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async authenticate(authenticateRequest) {
        try {
            return await this.authService.authenticateUser(authenticateRequest);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async confirm(confirmRequest) {
        try {
            return await this.authService.ConfirmUser(confirmRequest);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async resendConfirm(resendRequest) {
        try {
            return await this.authService.ResendConfirmation(resendRequest);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async forgotPassword(forgotPasswordRequest) {
        try {
            return await this.authService.ForgotPassword(forgotPasswordRequest);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async confirmPassword(confirmPasswordRequest) {
        try {
            return await this.authService.ConfirmForgotPassword(confirmPasswordRequest);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async verifyToken(claimVerifyRequest) {
        try {
            return await this.verifyService.verifyToken(claimVerifyRequest);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('authenticate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticate", null);
__decorate([
    common_1.Post('confirm'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
__decorate([
    common_1.Post('resend-confirm'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendConfirm", null);
__decorate([
    common_1.Post('forgot-password'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    common_1.Post('confirm-password'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPassword", null);
__decorate([
    common_1.Post('verify-token'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyToken", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        verify_service_1.VerifyService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map