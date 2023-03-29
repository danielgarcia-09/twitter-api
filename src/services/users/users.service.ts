import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
        return await this.userRepository.findOne(options);
    }

    async find(options: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
        return await this.userRepository.find(options);
    }

    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        return await this.userRepository.create(data).save()
    }

    async update(criteria: FindOptionsWhere<UserEntity>, data: Partial<UserEntity>): Promise<UpdateResult> {
        return await this.userRepository.update(criteria, data)
    }
}
