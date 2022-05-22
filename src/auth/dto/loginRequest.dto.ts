import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}
