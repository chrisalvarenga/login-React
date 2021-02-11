import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as Axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { ConfigService } from '@nestjs/config';
import { MapOfKidToPublicKey, PublicKeys, ClaimVerifyRequest, ClaimVerifyResult, TokenHeader, Claim } from './verify.interface';

@Injectable()
export class VerifyService {
    private poolId: string;
    private cognitoIssuer;

    constructor(
        private configService: ConfigService
    ) {
        this.poolId = this.configService.get<string>('auth.UserPoolId');
        this.cognitoIssuer = this.configService.get<string>('auth.CognitoIssuer') + `/${this.poolId}`;
    }


    private cacheKeys: MapOfKidToPublicKey | undefined;
    private verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

    private getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
        try {
            if (!this.cacheKeys) {
                const url = `${this.cognitoIssuer}/.well-known/jwks.json`;
                const publicKeys = await Axios.default.get<PublicKeys>(url);
                this.cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
                    const pem = jwkToPem(current);
                    agg[current.kid] = { instance: current, pem };
                    return agg;
                }, {} as MapOfKidToPublicKey);
                return this.cacheKeys;
            } else {
                return this.cacheKeys;
            }
        }
        catch (error) {
            throw new Error('error getting public keys');
        }
    };

    async verifyToken(request: ClaimVerifyRequest): Promise<ClaimVerifyResult> {
        let result: ClaimVerifyResult;
        try {
            const token = request.token;
            const tokenSections = (token || '').split('.');
            if (tokenSections.length < 2) {
                throw new Error('requested token is invalid');
            }
            const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
            const header = JSON.parse(headerJSON) as TokenHeader;
            const keys = await this.getPublicKeys();
            const key = keys[header.kid];
            if (key === undefined) {
                throw new Error('claim made for unknown kid');
            }
            const claim = await this.verifyPromised(token, key.pem) as Claim;
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
        } catch (error) {
            result = { username: '', error, isValid: false };
        }
        return result;
    }
}
