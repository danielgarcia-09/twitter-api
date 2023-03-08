import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { TweetEntity } from '../../database/entities/tweet.entity';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
    imports: [TypeOrmModule.forFeature([TweetEntity])],
    controllers: [TweetsController],
    providers: [TweetsService]
})
export class TweetsModule {}
