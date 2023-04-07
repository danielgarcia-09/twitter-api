import { Controller, Delete, Get, HttpCode, Param, Post, Query, Request, UseGuards } from '@nestjs/common';

import { PaginationDTO } from 'src/database/dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/interfaces/general/general.interface';
import { FollowersService } from 'src/services/followers/followers.service';
import { calculateSkip } from 'src/utils/random.util';

@UseGuards(JwtAuthGuard)
@Controller('followers')
export class FollowersController {


    constructor(
        private readonly followerService: FollowersService
    ) {}

    @Get()
    @HttpCode(200)
    async getFollowers(@Request() req: ExpressRequest, @Query() query: PaginationDTO) {
        const user = req.client

        const { skip, take } = query

        const all = await this.followerService.find({
            where: {
                followingId: user.id
            },
            relations: ['follower'],
            select: {
                id: true,
                follower: {
                    name: true,
                    username: true,
                }
            },
            skip: calculateSkip(skip, take),
            take
        })

        const followers = all.map((followerEntity) => followerEntity.follower)
        return { followers }
    }

    @Get('following')
    async getFollowing(@Request() req: ExpressRequest, @Query() query: PaginationDTO) {
        const user = req.client

        const { skip, take } = query

        const all = await this.followerService.find({
            where: {
                followerId: user.id
            },
            relations: ['following'],
            select: {
                id: true,
                following: {
                    name: true,
                    username: true,
                }
            },
            skip: calculateSkip(skip, take),
            take
        })

        const following = all.map((followerEntity) => followerEntity.following)
        return { following }
    }

    @Post(':uuid')
    @HttpCode(202)
    async follow(@Request() req: ExpressRequest, @Param('uuid') uuid: string) {
        const user = req.client

        const follow = await this.followerService.follow(uuid, user.uuid)

        return { message: `You started following ${follow.username}` }
    }

    @Delete(':uuid')
    @HttpCode(202)
    async unfollow(@Request() req: ExpressRequest, @Param('uuid') uuid: string) {
        const user = req.client

        const follow = await this.followerService.unfollow(uuid, user.uuid)

        return { message: `You stopped following ${follow.username}` }
    }

}
