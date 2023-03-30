import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowersController } from 'src/controllers/followers/followers.controller';
import { FollowerEntity } from 'src/database/entities';
import { FollowersService } from 'src/services/followers/followers.service';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([FollowerEntity]),
        UsersModule
    ],
    providers: [FollowersService],
    controllers: [FollowersController]
})
export class FollowersModule {}
