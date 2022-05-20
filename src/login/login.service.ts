import { IAuthProvider } from '../interfaces/authProvider.interface';
import { Injectable } from '@nestjs/common';
import { ActiveDirectoryAuthenticationService } from '../services/activeDirectoryAuthentication.service';

@Injectable()
export class LoginService {
  private _authProvider: IAuthProvider;
  constructor(private authProvider: ActiveDirectoryAuthenticationService) {
    this._authProvider = authProvider;
  }
}
