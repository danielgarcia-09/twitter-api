import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule, 
    AuthModule,
    TweetsModule, 
  ],
  providers: [
    ConfigService,
  ],
})

export class AppModule {

  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('APP_PORT')    
  }
}
