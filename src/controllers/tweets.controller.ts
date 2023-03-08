import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTweetDto, PaginationDTO, UpdateTweetDto } from '../database/dto';
import { TweetEntity } from '../database/entities';
import { TweetsService } from '../services/tweets/tweets.service';

@Controller('tweets')
export class TweetsController {

    constructor(private readonly tweetService: TweetsService) { }

    @Get()
    getTweets(@Query() filter: PaginationDTO): Promise<TweetEntity[]> {
        const { skip, take } = filter;
        return this.tweetService.getTweets(skip, take)
    }

    @Get(':id')
    getTweet(@Param('id') id: number): Promise<TweetEntity> {
        return this.tweetService.getTweet(id);
    }

    @Post()
    createTweet(@Body() payload: CreateTweetDto): Promise<TweetEntity> {
        return this.tweetService.createTweet(payload);
    }

    @Patch(':id')
    updateTweet(
        @Param('id') id: number, 
        @Body() message: UpdateTweetDto
    ): Promise<TweetEntity> {
        return this.tweetService.updateTweet(id, message)
    }

    @Delete(':id')
    deleteTweet(@Param('id') id: number): Promise<void> {
        return this.tweetService.removeTweet(id)
    }
}
