import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/interfaces/jwt/jwt.interface";
import { UsersService } from "src/services/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UsersService,
        private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET")
        })
    }

    async validate(payload: JwtPayload) {

        const { sub: id, username } = payload;
        
        const client = await this.userService.findOne({
            where: { id, username }
        })

        if(!client) throw new UnauthorizedException();
                
        return client
    }
}