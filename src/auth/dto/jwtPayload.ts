export class JwtTokenPayload {
  issuer?: string;
  iat: number;
  exp: number;
  name: string;
  email: string;
  groups: any;
}
