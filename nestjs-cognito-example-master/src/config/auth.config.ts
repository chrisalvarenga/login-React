import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
    SecreyKey: process.env.COGNITO_SECRET_KEY,
    CognitoIssuer: process.env.COGNITO_ISSUER
}));