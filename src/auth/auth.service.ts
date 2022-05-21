import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getOsEnv } from '../lib/utils';
import { ActiveDirectoryAuthenticationService } from './activeDirectoryAuthentication.service';
import { JwtTokenPayload } from './dto/jwtPayload';
import { User } from './dto/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private activeDirectoryAuth: ActiveDirectoryAuthenticationService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user: any = await this.activeDirectoryAuth.authenticate(
      username,
      password,
    );
    let token = null;
    if (user) {
      token = this.getJwt(user);
    }
    return { user, access_token: token };
  }

  public getJwt(user: User) {
    const payload: JwtTokenPayload = {
      name: user.displayName,
      email: user.email,
      groups: user.roles,
      issuer: 'Configuration Manager',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 30,
    };
    return this.jwtService.sign(payload, {
      secret: getOsEnv('JWT_SECRET', 'qazwsx123'),
    });
  }
}
