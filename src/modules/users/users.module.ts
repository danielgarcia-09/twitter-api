import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/services/users/users.service';
import { UserEntity } from '../../database/entities';

@Module({
    providers: [UsersService],
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UsersService]
})
export class UsersModule {}
