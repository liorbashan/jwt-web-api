import { IAuthProvider } from '../interfaces/authProvider.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActiveDirectoryAuthenticationService implements IAuthProvider {
  public async authenticate(username: string, password: string): Promise<any> {
    return { user: username, pass: password };
  }
}
