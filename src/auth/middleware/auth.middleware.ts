import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { getOsEnv } from '../../lib/utils';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const parsedToken: any = verify(accessToken, getOsEnv('JWT_SECRET'));
      user = parsedToken;
      if (user) {
        req.user = user;
      }
    } catch (error) {
      throw new ForbiddenException('Please register or sign in.');
    }

    next();
  }
}
