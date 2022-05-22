import { CacheService } from './cache/cache.service';
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
  Query,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private cacheService: CacheService,
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

  @Get('redis')
  @UseGuards(JwtAuthGuard)
  public async getkey(@Query('key') key: string) {
    const val: any = await this.cacheService.getKey(key);
    return val;
  }

  @Post('redis')
  @UseGuards(JwtAuthGuard)
  public async setkey(@Query('key') key: string, @Query('val') val: string) {
    await this.cacheService.setValue(key, val).catch((err) => {
      throw new Error(err);
    });
    return;
  }
}
