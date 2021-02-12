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
const util_1 = require("util");
const Axios = require("axios");
const jsonwebtoken = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const config_1 = require("@nestjs/config");
let VerifyService = class VerifyService {
    constructor(configService) {
        this.configService = configService;
        this.verifyPromised = util_1.promisify(jsonwebtoken.verify.bind(jsonwebtoken));
        this.getPublicKeys = async () => {
            try {
                if (!this.cacheKeys) {
                    const url = `${this.cognitoIssuer}/.well-known/jwks.json`;
                    const publicKeys = await Axios.default.get(url);
                    this.cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
                        const pem = jwkToPem(current);
                        agg[current.kid] = { instance: current, pem };
                        return agg;
                    }, {});
                    return this.cacheKeys;
                }
                else {
                    return this.cacheKeys;
                }
            }
            catch (error) {
                throw new Error('error getting public keys');
            }
        };
        this.poolId = this.configService.get('auth.UserPoolId');
        this.cognitoIssuer = this.configService.get('auth.CognitoIssuer') + `/${this.poolId}`;
    }
    async verifyToken(request) {
        let result;
        try {
            const token = request.token;
            const tokenSections = (token || '').split('.');
            if (tokenSections.length < 2) {
                throw new Error('requested token is invalid');
            }
            const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
            const header = JSON.parse(headerJSON);
            const keys = await this.getPublicKeys();
            const key = keys[header.kid];
            if (key === undefined) {
                throw new Error('claim made for unknown kid');
            }
            const claim = await this.verifyPromised(token, key.pem);
            const currentSeconds = Math.floor((new Date()).valueOf() / 1000);
            if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
                throw new Error('claim is expired or invalid');
            }
            if (claim.iss !== this.cognitoIssuer) {
                throw new Error('claim issuer is invalid');
            }
            if (claim.token_use !== 'access') {
                throw new Error('claim use is not access');
            }
            result = { username: claim.username, isValid: true };
        }
        catch (error) {
            result = { username: '', error, isValid: false };
        }
        return result;
    }
};
VerifyService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], VerifyService);
exports.VerifyService = VerifyService;
//# sourceMappingURL=verify.service.js.map