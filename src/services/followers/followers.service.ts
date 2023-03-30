import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowerEntity } from 'src/database/entities';
import { FindManyOptions, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class FollowersService {

    constructor(
        @InjectRepository(FollowerEntity)
        private readonly followerRepository: Repository<FollowerEntity>,
        private readonly userService: UsersService,
    ) { }

    async follow(followingUuid: string, followerUuid: string) {
        
        const following = await this.userService.findOne({
            where: {
                uuid: followingUuid
            }
        });

        if(!following) throw new Error("Following not found");

        const follower = await this.userService.findOne({
            where: {
                uuid: followerUuid
            }
        })

        if(!follower) throw new Error("Follower not found");

        const entity = this.followerRepository.create({
            followerId: follower.id,
            followingId: following.id
        });

        await this.followerRepository.save(entity);
        return { username: following.username }
    }

    async unfollow(followingUuid: string, followerUuid: string) {
        const followRelation = await this.followerRepository.findOne({
            where: {
                following: {
                    uuid: followingUuid
                },
                follower: {
                    uuid: followerUuid
                }
            },
            relations: ['following'],
            select: {
                id: true,
                following: {
                    username: true
                }
            }
        });

        if(!followRelation) throw new Error("Following Relation not found");

        await this.followerRepository.remove(followRelation);
        return { username: followRelation.following.username } 
    }

    async find(options: FindManyOptions<FollowerEntity>) {
        return await this.followerRepository.find(options);
    }
}
