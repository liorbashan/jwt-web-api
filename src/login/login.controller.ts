import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/loginDto';

@Controller('login')
export class LoginController {
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() req: LoginDto): Promise<any> {
    return { username: req.username };
  }
}
