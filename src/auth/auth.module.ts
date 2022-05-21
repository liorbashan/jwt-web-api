import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ActiveDirectoryAuthenticationService } from './activeDirectoryAuthentication.service';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  exports: [AuthService, JwtService, ActiveDirectoryAuthenticationService],
  providers: [AuthService, JwtService, ActiveDirectoryAuthenticationService],
})
export class AuthModule {}
