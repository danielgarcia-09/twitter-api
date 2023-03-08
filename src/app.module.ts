import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { DatabaseModule } from './modules/database/database.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth/auth.module';
import { AuthService } from './services/auth/auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule, 
    TweetsModule, 
    DatabaseModule, AuthModule
  ],
  providers: [ConfigService, AuthService],
})

export class AppModule {
  
  static port: number;
  
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('APP_PORT')
  }
}
