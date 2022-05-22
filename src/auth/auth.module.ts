import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ActiveDirectoryAuthenticationService } from './activeDirectoryAuthentication.service';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getOsEnv } from '../lib/utils';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: getOsEnv('JWT_SECRET', 'qazwsx123'),
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [AuthService, JwtService, ActiveDirectoryAuthenticationService],
  providers: [
    AuthService,
    JwtService,
    ActiveDirectoryAuthenticationService,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
