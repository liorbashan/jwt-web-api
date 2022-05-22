import { Memberships } from './memberships';
import { IAuthProvider } from '../interfaces/authProvider.interface';
import { Injectable } from '@nestjs/common';
import { getOsEnv } from '../lib/utils';
import { User } from './dto/user';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AD = require('activedirectory2').promiseWrapper;

@Injectable()
export class ActiveDirectoryAuthenticationService implements IAuthProvider {
  private permissionGroups: string[] = Object.values(Memberships);

  public async authenticate(username: string, password: string): Promise<any> {
    // const user = new User();
    // user.displayName = 'Lior Bashan';
    // user.email = 'xxx@bbb.com';
    // user.roles = ['XXX', 'YYY'];
    // return user;
    const ldapHost = getOsEnv('LDAP_SERVER_HOST');
    const baseDN = getOsEnv('LDAP_BASE_DN');
    const config = { url: ldapHost, baseDN, username, password };
    const ad = new AD(config);
    let result: User;

    return new Promise(async (resolve, reject) => {
      const authenticated = await ad
        .authenticate(username, password)
        .catch((err: any) => {
          reject(err);
          return err;
        });
      if (authenticated) {
        const user = await ad.findUser(username).catch((err: any) => {
          reject(err);
        });
        result = { displayName: user.displayName, email: user.mail };
        console.log(user);
        const adGroups: any[] = await ad
          .getGroupMembershipForUser(username)
          .catch((err: any) => {
            reject(err);
          });
        if (adGroups?.length > 0) {
          const memberships = adGroups
            .map((group) => group.cn)
            .filter((name) => this.permissionGroups.includes(name));
          result.roles = memberships;
        }

        resolve(result);
      } else {
        reject('Invalid username password');
      }
    });
  }
}
