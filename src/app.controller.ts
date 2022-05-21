import { AuthService } from './auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDto } from './login/dto/loginDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): any {
    // return this.appService.getHello();
    return { foo: 'bar' };
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() req: LoginDto): Promise<any> {
    const user: any = await this.authService.validateUser(
      req.username,
      req.password,
    );
    return user;
  }
}
