import { ConfigService } from '@nestjs/config';
import { ClaimVerifyRequest, ClaimVerifyResult } from './verify.interface';
export declare class VerifyService {
    private configService;
    private poolId;
    private cognitoIssuer;
    constructor(configService: ConfigService);
    private cacheKeys;
    private verifyPromised;
    private getPublicKeys;
    verifyToken(request: ClaimVerifyRequest): Promise<ClaimVerifyResult>;
}
