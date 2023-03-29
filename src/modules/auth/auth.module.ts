import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth/auth.service';
import { TokensModule } from '../tokens/tokens.module';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [
        UsersModule, 
        TokensModule,
        PassportModule.register({
            property: 'client'
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get("JWT_SECRET"),
                signOptions: {
                    expiresIn: config.get("JWT_EXPIRATION"),
                }
            })
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
