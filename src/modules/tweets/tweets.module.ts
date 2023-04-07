import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { TweetEntity } from '../../database/entities/tweets/tweet.entity';
import { TweetsController } from '../../controllers/tweets/tweets.controller';
import { TweetsService } from '../../services/tweets/tweets.service';
import { FollowersModule } from '../followers/followers.module';

@Module({
    imports: [FollowersModule,TypeOrmModule.forFeature([TweetEntity])],
    providers: [TweetsService],
    controllers: [TweetsController],
})
export class TweetsModule {}
