import { Module } from '@nestjs/common';
import { ActiveDirectoryAuthenticationService } from './activeDirectoryAuthentication.service';
import { AuthService } from './auth.service';

@Module({
  exports: [AuthService, ActiveDirectoryAuthenticationService],
  providers: [AuthService, ActiveDirectoryAuthenticationService],
})
export class AuthModule {}
