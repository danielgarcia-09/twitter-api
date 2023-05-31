import { Controller, Delete, Get, HttpCode, Param, Post, Query, Request, UseGuards } from '@nestjs/common';

import { PaginationDTO } from 'src/database/dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExpressRequest } from 'src/interfaces/general/general.interface';
import { FollowersService } from 'src/services/followers/followers.service';

@UseGuards(JwtAuthGuard)
@Controller('followers')
export class FollowersController {

    constructor(
        private readonly followerService: FollowersService
    ) { }

    @Get()
    @HttpCode(200)
    async getFollowers(@Request() req: ExpressRequest, @Query() query: PaginationDTO) {
        const user = req.client

        const { skip, take } = query

        const followers = await this.followerService.getFollowers(user.uuid, skip, take);

        return { followers }
    }

    @Get('following')
    async getFollowing(@Request() req: ExpressRequest, @Query() query: PaginationDTO) {
        const user = req.client

        const { skip, take } = query

        const following = await this.followerService.getFollowing(user.uuid, skip, take);

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
    async unFollow(@Request() req: ExpressRequest, @Param('uuid') uuid: string) {
        const user = req.client

        const follow = await this.followerService.unFollow(uuid, user.uuid)

        return { message: `You stopped following ${follow.username}` }
    }

}
