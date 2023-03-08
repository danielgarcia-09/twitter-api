import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findOne(options: FindOneOptions<UserEntity>) {
        return await this.userRepository.findOne(options);
    }

    async find(options: FindManyOptions<UserEntity>) {
        return await this.userRepository.find(options);
    }

    async create(data: Partial<UserEntity>) {
        return await this.userRepository.create(data).save()
    }
}
