import { IAuthProvider } from '../interfaces/authProvider.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActiveDirectoryAuthenticationService implements IAuthProvider {
  authenticate(username: string, password: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
