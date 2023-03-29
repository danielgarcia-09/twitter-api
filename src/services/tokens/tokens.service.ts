import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { TokenEntity } from "src/database/entities";
import { EntityPick } from "src/interfaces/general/general.interface";
import { FindOneOptions, IsNull, Repository } from "typeorm";

@Injectable()
export class TokensService {

    constructor(
        @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>
    ) {}

    async create(data: EntityPick<TokenEntity, "userId">): Promise<TokenEntity> {
        const entity = this.tokenRepository.create(data)
        return this.tokenRepository.save(entity)
    }
    
    async findUserLatestToken (userId: number): Promise<TokenEntity> {
        return this.tokenRepository.findOne({
            where: { 
                userId,
                expiredAt: IsNull() 
            },
            order: { createdAt: 'DESC' }
        })
    }

    async expireToken(id: number): Promise<boolean> {
        const updated = await this.tokenRepository.update(id, {
            expiredAt: new Date()
        })

        return updated.affected > 0
    }

    async findOne(options: FindOneOptions<TokenEntity>): Promise<TokenEntity> {
        return this.tokenRepository.findOne(options)
    } 
}