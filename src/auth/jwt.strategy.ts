import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getOsEnv } from '../lib/utils';
import { JwtTokenPayload } from './dto/jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getOsEnv('JWT_SECRET', 'qazwsx123'),
      passReqToCallback: true,
    });
  }

  async validate(req: Express.Request, payload: JwtTokenPayload) {
    console.log(req);
    req.user = payload;
    console.log(payload);
    return payload;
  }
}
