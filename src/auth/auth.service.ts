import { LoginResponse } from './dto/loginResponse.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { getOsEnv } from '../lib/utils';
import { ActiveDirectoryAuthenticationService } from './activeDirectoryAuthentication.service';
import { JwtTokenPayload } from './dto/jwtPayload';
import { User } from './dto/user';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private activeDirectoryAuth: ActiveDirectoryAuthenticationService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<LoginResponse> {
    const user: User = await this.activeDirectoryAuth
      .authenticate(username, password)
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
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
      exp: Math.floor(Date.now() / 1000) + 3600 * 24,
    };
    return sign(payload, getOsEnv('JWT_SECRET'));
    // return this.jwtService.sign(payload, {
    //   secret: getOsEnv('JWT_SECRET'),
    // });
  }
}
