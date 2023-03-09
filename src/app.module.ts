import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, 
    TweetsModule, 
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    ConfigService,
  ],
})

export class AppModule {

  static port: number;
  static cookie_secret: string;
  static cookie_name: string;
  static cookie_expiration: number;
  static jwt_secret: string;
  static jwt_expiration: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('APP_PORT')
    
    AppModule.cookie_name = this.configService.get('COOKIE_NAME')
    AppModule.cookie_secret = this.configService.get('COOKIE_SECRET')
    AppModule.cookie_expiration = this.configService.get('COOKIE_EXPIRATION')
    
    AppModule.jwt_secret = this.configService.get('JWT_SECRET')
    AppModule.jwt_expiration = this.configService.get('JWT_EXPIRATION')
  }
}
