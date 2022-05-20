import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { ActiveDirectoryAuthenticationService } from './services/activeDirectoryAuthentication.service';

@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService, ActiveDirectoryAuthenticationService],
})
export class AppModule {}
