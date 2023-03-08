import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto, UpdateTweetDto } from '../../database/dto';
import { Repository } from 'typeorm';
import { TweetEntity } from '../../database/entities/tweet.entity';

@Injectable()
export class TweetsService {
    
    constructor(@InjectRepository(TweetEntity) private readonly tweetRepository: Repository<TweetEntity>) {}

    async getTweets(skip: number = 0, take: number = 10): Promise<TweetEntity[]> {
        return await this.tweetRepository.find({ 
            skip,
            take,
            relations: { user: true } 
        })
    }

    async getTweet(id: number): Promise<TweetEntity> {
        const tweet = await this.tweetRepository.findOne({ where: {id}, relations: { user: true }});
    
        if(!tweet) throw new NotFoundException("Tweet not found")

        return tweet
    }

    async createTweet({ message }: CreateTweetDto): Promise<TweetEntity> {
        const tweet = this.tweetRepository.create({ message })
        return await this.tweetRepository.save(tweet)
    }

    async updateTweet(id: number, { message }: UpdateTweetDto): Promise<TweetEntity> {
        const tweet = await this.tweetRepository.preload({
            id,
            message
        })
        if(!tweet) throw new NotFoundException('Tweet not found')
        
        await this.tweetRepository.save(tweet);
        return tweet
    }

    async removeTweet(id: number): Promise<void> {
        const tweet = await this.tweetRepository.findOne({ where: {id} });

        if(!tweet) throw new NotFoundException('Tweet not found')

        this.tweetRepository.remove(tweet);
    }
}
