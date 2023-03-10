import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AppModule } from "src/app.module";
import { cookiesConfig } from "src/config";
import { UserEntity } from "src/database/entities";
import { ExpressRequest } from "src/interfaces/general/general.interface";
import { JwtPayload } from "src/interfaces/jwt/jwt.interface";
import { UsersService } from "src/services/users/users.service";
import { decrypt } from "src/utils/encryption.util";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService,
        private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET")
        })
    }


    private static extractJWT(req: ExpressRequest): string | null {
        if(
            req.cookies &&
            req.cookies[cookiesConfig.name]
        ) {
            const buffer = Buffer.from(req.cookies[cookiesConfig.name], 'hex');
            let decryptedToken = decrypt(buffer).toString()
            return decryptedToken
        }
        return null
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {

        const { sub: id, username } = payload;
        
        const client = await this.userService.findOne({
            where: { id, username }
        })

        if(!client) throw new UnauthorizedException();
                
        return client
    }
}