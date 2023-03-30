import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.module';
import { DatabaseModule } from './modules/database/database.module';
import { FollowersModule } from './modules/followers/followers.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    TweetsModule,
    TokensModule,
    FollowersModule,
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
