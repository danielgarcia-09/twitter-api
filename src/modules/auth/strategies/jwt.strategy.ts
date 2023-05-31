import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { cookiesConfig, encryptionConfig } from "src/config";
import { UserEntity } from "src/database/entities";
import { ExpressRequest } from "src/interfaces/general/general.interface";
import { JwtPayload } from "src/interfaces/jwt/jwt.interface";
import { UsersService } from "src/services/users/users.service";

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
            let decryptedToken = `${req.cookies[cookiesConfig.name]}`.decrypt(encryptionConfig.encoding);
            return decryptedToken
        }
        return null
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {

        const { sub: id, username } = payload;
        
        const user = await this.userService.findOne({
            where: { id, username }
        })

        if(!user) throw new UnauthorizedException();
                
        return user
    }
}