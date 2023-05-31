import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExpressRequest, ResponseI } from 'src/interfaces/general/general.interface';
import { calculateSkip } from 'src/utils/random.util';
import { CreateTweetDto, PaginationDTO, UpdateTweetDto } from '../../database/dto';
import { TweetEntity } from '../../database/entities';
import { TweetsService } from '../../services/tweets/tweets.service';

@UseGuards(JwtAuthGuard)
@Controller('tweets')
export class TweetsController {

    constructor(private readonly tweetService: TweetsService) { }

    @Get()
    async getOwnTweets(@Request() req: ExpressRequest ,@Query() filter: PaginationDTO): Promise<ResponseI> {
        const { skip, take } = filter;
        const user = req.client;

        const tweets = await this.tweetService.getTweets({
            where: {
                userId: user.id
            },
            skip: calculateSkip(skip, take), 
            take,
        })

        return { tweets, code: 200, message: 'Tweets fetched successfully' }
    }

    @Get('following')
    async getFollowingTweets(@Request() req: ExpressRequest, @Query() filter: PaginationDTO): Promise<ResponseI> {
        const { skip, take } = filter;
        const user = req.client;

        const tweets = await this.tweetService.getFollowingTweets(user.id, skip, take);

        return { ...tweets, code: 200, message: 'Tweets fetched successfully' }
    }


    @Get(':id')
    getTweet(@Param('id') id: number): Promise<TweetEntity> {
        return this.tweetService.getTweet(id);
    }

    @Post()
    async createTweet(@Request() req: ExpressRequest ,@Body() payload: CreateTweetDto): Promise<ResponseI> {
        const user = req.client;

        const createdTweet = await this.tweetService.createTweet({
            user,
            userId: user.id,
            ...payload
        });

        return { tweet: createdTweet, code: 201, message: 'Tweet created successfully' }
    }

    @Patch(':uuid')
    async updateTweet(@Request() req: ExpressRequest, @Param('uuid') uuid: string, @Body() message: UpdateTweetDto): Promise<ResponseI> {
        const user = req.client;
        const tweet = await this.tweetService.updateTweet({uuid, userId: user.id}, message)
        
        return { tweet, code: 200, message: 'Tweet updated successfully' }
    }

    @Delete(':uuid')
    async deleteTweet(@Request() req: ExpressRequest, @Param('uuid') uuid: string): Promise<ResponseI> {
        
        const user = req.client;
        
        const deletedTweet = await this.tweetService.removeTweet({
            uuid,
            userId: user.id
        })

        return { tweet: deletedTweet, code: 200, message: 'Tweet deleted successfully' }
    }
}
