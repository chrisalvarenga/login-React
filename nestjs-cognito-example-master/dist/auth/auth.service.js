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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const amazon_cognito_identity_js_1 = require("amazon-cognito-identity-js");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(configService) {
        this.configService = configService;
        this.userPool = new amazon_cognito_identity_js_1.CognitoUserPool({
            UserPoolId: this.configService.get('auth.UserPoolId'),
            ClientId: this.configService.get('auth.ClientId')
        });
    }
    get secretKey() {
        return this.configService.get('auth.SecretKey');
    }
    async register(authRegisterRequest) {
        const { email, password } = authRegisterRequest;
        return new Promise(((resolve, reject) => {
            return this.userPool.signUp(email, password, [
                new amazon_cognito_identity_js_1.CognitoUserAttribute({ Name: 'email', Value: email })
            ], null, (err, result) => {
                if (!result) {
                    reject(err);
                }
                else {
                    resolve(result.user);
                }
            });
        }));
    }
    async authenticateUser(user) {
        const { name, password } = user;
        const authenticationDetails = new amazon_cognito_identity_js_1.AuthenticationDetails({
            Username: name,
            Password: password,
        });
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        const newUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(((resolve, reject) => {
            return newUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: ((err) => {
                    reject(err);
                }),
            });
        }));
    }
    async ConfirmUser(user) {
        const { name, code } = user;
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        const newUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(((resolve, reject) => {
            return newUser.confirmRegistration(code, false, (result) => {
                resolve(result);
            });
        }));
    }
    async ResendConfirmation(user) {
        const { name } = user;
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        const newUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(((resolve, reject) => {
            return newUser.resendConfirmationCode((result) => {
                resolve(result);
            });
        }));
    }
    async ForgotPassword(user) {
        const { name } = user;
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        const newUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(((resolve, reject) => {
            return newUser.forgotPassword({
                onSuccess: (result) => {
                    resolve(result);
                },
                onFailure: (result) => {
                    reject(result);
                }
            });
        }));
    }
    async ConfirmForgotPassword(user) {
        const { name, code, password } = user;
        const userData = {
            Username: name,
            Pool: this.userPool,
        };
        const newUser = new amazon_cognito_identity_js_1.CognitoUser(userData);
        return new Promise(((resolve, reject) => {
            return newUser.confirmPassword(code, password, {
                onSuccess: () => {
                    resolve();
                },
                onFailure: (result) => {
                    reject(result);
                }
            });
        }));
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map