import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])]
})
export class UsersModule {}
