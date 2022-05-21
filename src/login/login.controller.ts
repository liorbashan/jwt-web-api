import { LoginService } from './login.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/loginDto';

@Controller('login')
export class LoginController {
  constructor(private _loginService: LoginService) {}
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() req: LoginDto): Promise<any> {
    const result: any = await this._loginService.login(req).catch((err) => {
      throw new BadRequestException();
    });
    return result;
  }
}
