import { LoginRequest } from './auth/dto/loginRequest.dto';
import { LoginResponse } from './auth/dto/loginResponse.dto';
import { Roles } from './auth/decorator/roles.decorator';
import { AuthService } from './auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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
  async login(@Body() req: LoginRequest): Promise<any> {
    const user: LoginResponse = await this.authService.validateUser(
      req.username,
      req.password,
    );
    return user;
  }

  @Post('secure')
  @UseGuards(JwtAuthGuard)
  @Roles('BannerAdminRoot')
  public async test(@Request() req) {
    console.log(req);
    return 'ok';
  }
}
