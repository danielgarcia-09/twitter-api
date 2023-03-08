import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ExpressRequest } from 'src/interfaces/general/general.interface';
import { JwtPayload } from 'src/interfaces/jwt/jwt.interface';
import { SignInDTO } from '../../database/dto';
import { SignUpDTO } from '../../database/dto/auth/sign-up.dto';
import { UserEntity } from '../../database/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(payload: SignInDTO): Promise<UserEntity | null> {
        const { username, password } = payload
        const user = await this.userService.findOne({
            where: { username }
        })

        if (user && user.isPasswordMatch(password)) {
            return user
        }

        return null
    }

    async signUp(data: SignUpDTO): Promise<UserEntity> {
        const entity = await this.userService.create(data);
        return entity
    }

    async signIn(payload: SignInDTO) {

        const { username, password } = payload

        const user = await this.userService.findOne({
            where: { username }
        })

        if (!user || !user.isPasswordMatch(password)) throw new UnauthorizedException()

        const jwtPayload: JwtPayload = {
            username,
            sub: user.id
        }

        return {
            access_token: this.jwtService.sign(jwtPayload)
        }

    }
}
