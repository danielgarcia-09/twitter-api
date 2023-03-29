import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/database/entities';
import { TokensService } from 'src/services/tokens/tokens.service';

@Module({
    imports: [TypeOrmModule.forFeature([TokenEntity])],
    providers: [TokensService],
    exports: [TokensService]
})
export class TokensModule {}
