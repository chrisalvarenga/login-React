"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = config_1.registerAs('auth', () => ({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecreyKey: process.env.COGNITO_SECRET_KEY,
    CognitoIssuer: process.env.COGNITO_ISSUER
}));
//# sourceMappingURL=auth.config.js.map