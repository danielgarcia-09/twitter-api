import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import mailer from 'src/helpers/mailer/mailer.helper';

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
        mailer.sendMessage({
            from: 'test@gmail.com',
            to: entity.email,
            subject: 'Welcome to Twitter',
            text: 'Welcome to Twitter',
        })
        return entity
    }

    async signIn(payload: SignInDTO) {

        const { username, password } = payload

        const user = await this.userService.findOne({
            where: { username }
        })

        if (!user || !user.isPasswordMatch(password)) throw new UnauthorizedException()
        if(!user.active) throw new UnauthorizedException('User not active')

        const jwtPayload: JwtPayload = {
            username,
            sub: user.id
        }

        const token = this.jwtService.sign(jwtPayload)

        return token.encrypt('hex');
    }
}
