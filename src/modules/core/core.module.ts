import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        // PassportModule.register({
        //   property: 'client'
        // }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get("JWT_SECRET"),
                signOptions: {
                    expiresIn: config.get("JWT_EXPIRATION"),
                },
            })
        })
    ],
    exports: [JwtModule, /*PassportModule*/]
})
export class CoreModule {}
