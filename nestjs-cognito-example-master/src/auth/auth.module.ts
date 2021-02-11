import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyService } from './verify/verify.service';

@Module({
  providers: [AuthService, VerifyService],
  exports: [AuthService, VerifyService]
})
export class AuthModule {}
