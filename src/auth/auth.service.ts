import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ActiveDirectoryAuthenticationService } from './activeDirectoryAuthentication.service';

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

  public getJwt(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload, { secret: 'qazwsx123' });
  }
}
