import { LoginDto } from './dto/loginDto';
import { IAuthProvider } from '../interfaces/authProvider.interface';
import { Injectable } from '@nestjs/common';
import { ActiveDirectoryAuthenticationService } from '../services/activeDirectoryAuthentication.service';

@Injectable()
export class LoginService {
  private _authProvider: IAuthProvider;
  constructor(private authProvider: ActiveDirectoryAuthenticationService) {
    this._authProvider = authProvider;
  }

  public async login(creds: LoginDto): Promise<any> {
    return await this._authProvider.authenticate(
      creds.username,
      creds.password,
    );
  }
}
