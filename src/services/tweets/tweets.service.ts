import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseI } from 'src/interfaces/general/general.interface';
import { calculateSkip } from 'src/utils/random.util';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { TweetEntity } from '../../database/entities/tweets/tweet.entity';
import { FollowersService } from '../followers/followers.service';
import { subscribeEvent } from 'src/events';
import { userEvents } from 'src/constants';
import { IUserEvent } from 'src/interfaces/events/event.interface';

@Injectable()
export class TweetsService {

    constructor(
        @InjectRepository(TweetEntity) private readonly tweetRepository: Repository<TweetEntity>,
        private readonly followerService: FollowersService
    ) { }

    async getTweets(options: FindManyOptions<TweetEntity>): Promise<TweetEntity[]> {
        return await this.tweetRepository.find(options)
    }

    async getFollowingTweets(userId: number, skip: number, take: number): Promise<{ tweets: TweetEntity[] }> {
        const following = await this.followerService.find({
            where: { followerId: userId },
            select: ['id', 'followingId']
        });

        const tweets = await this.tweetRepository.find({
            where: { userId: In(following.map(f => f.followingId)) },
            skip: calculateSkip(skip, take),
            take,
        })

        return { tweets }
    }

    async getTweet(id: number): Promise<TweetEntity> {
        const tweet = await this.tweetRepository.findOne({ where: { id }, relations: { user: true } });

        if (!tweet) throw new NotFoundException("Tweet not found")

        return tweet
    }

    async createTweet(payload: Partial<TweetEntity>): Promise<TweetEntity> {
        const tweet = this.tweetRepository.create(payload)

        const createdTweet = await this.tweetRepository.save(tweet)

        const tweetOwner = createdTweet.user;

        this.followerService.getFollowers(tweetOwner.uuid, undefined, undefined).then(followers => {
            followers.map(follower => {
                const payload: IUserEvent = { user: follower, tweetOwner: tweetOwner.username, tweet: createdTweet, room: follower.uuid };
                subscribeEvent.emit(userEvents.tweet, payload)
            })
        });

        return createdTweet;
    }

    async updateTweet(where: FindOptionsWhere<TweetEntity>, payload: Partial<TweetEntity>): Promise<TweetEntity> {

        let tweet = await this.tweetRepository.findOne({ where })
        if (!tweet) throw new NotFoundException('Tweet not found')

        tweet = Object.assign(tweet, payload)

        await this.tweetRepository.save(tweet);

        return tweet
    }

    async removeTweet(where: FindOptionsWhere<TweetEntity>): Promise<ResponseI> {
        const tweet = await this.tweetRepository.findOne({ where });

        if (!tweet) throw new NotFoundException('Tweet not found')

        const deletedTweet = await this.tweetRepository.remove(tweet);

        if (!deletedTweet) throw new NotFoundException('Tweet not found')

        return { code: 200, message: 'Tweet deleted successfully' }
    }
}
