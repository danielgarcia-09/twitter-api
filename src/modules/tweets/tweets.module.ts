import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { TweetEntity } from '../../database/entities/tweets/tweet.entity';
import { TweetsController } from '../../controllers/tweets/tweets.controller';
import { TweetsService } from '../../services/tweets/tweets.service';

@Module({
    imports: [TypeOrmModule.forFeature([TweetEntity])],
    providers: [TweetsService],
    controllers: [TweetsController],
})
export class TweetsModule {}
