import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            // userNameField: 'username',
            // passwordField: 'password'
        });
    }

    async validate(username: string, password: string): Promise<any> {
        const client = await this.authService.validateUser({username, password});

        if(!client) throw new UnauthorizedException();

        return client
    }
}