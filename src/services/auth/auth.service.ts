import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { mailerConfig } from 'src/config';
import mailer from 'src/helpers/mailer/mailer.helper';
import { ResponseI } from 'src/interfaces/general/general.interface';
import { JwtPayload } from 'src/interfaces/jwt/jwt.interface';
import { generateCode } from 'src/utils/random.util';
import { SignInDTO } from '../../database/dto';
import { SignUpDTO } from '../../database/dto/auth/sign-up.dto';
import { UserEntity } from '../../database/entities';
import { TokensService } from '../tokens/tokens.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly tokenService: TokensService,
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

    async signUp(payload: SignUpDTO): Promise<ResponseI> {
        try {

            const { username } = payload

            const user = await this.userService.findOne({
                where: { username }
            })

            if (user) throw new BadRequestException('User already exists')

            const entity = await this.userService.create(payload);

            const { token } = await this.tokenService.create({
                userId: entity.id,
            })

            mailer.sendMessage({
                from: 'test@gmail.com',
                to: entity.email,
                subject: 'Welcome to Twitter',
                text: `Welcome to Twitter, ${entity.name}! Please click on the link below to activate your account: ${mailerConfig.confirmUrl}/${token.encrypt('hex')}`,
            })

            return {
                message: `User created successfully, please check your email to activate your account`,
            }
        } catch (error) {
            console.error("❗ ~ file: auth.service.ts:38 ~ AuthService ~ signUp ~ error:", error)
            throw new BadRequestException('Something went wrong')
        }
    }

    async signIn(payload: SignInDTO) {
        const user = await this.validateUser(payload)

        if (!user) throw new UnauthorizedException()
        if (!user.active) throw new UnauthorizedException('User not active')

        const jwtPayload: JwtPayload = {
            username: payload.username,
            sub: user.id
        }

        const token = this.jwtService.sign(jwtPayload)

        return token.encrypt('hex');
    }

    async confirmEmail(token: string): Promise<ResponseI> {
        const isToken = await this.tokenService.findOne({
            where: { token: token.decrypt('hex') }
        })

        if (!isToken || isToken.expiredAt) throw new BadRequestException('Invalid token')

        const user = await this.userService.findOne({
            where: { id: isToken.userId }
        })

        if (!user) throw new BadRequestException('Invalid user')

        const isUpdated = await this.userService.update({
            id: user.id
        }, { active: true })

        if (!isUpdated || isUpdated.affected === 0) throw new BadRequestException('Something went wrong')

        this.tokenService.expireToken(isToken.id).catch(err => {
            console.error("❗ ~ file: auth.service.ts:105 ~ AuthService ~ confirmEmail ~ err:", err)
        })

        return {
            message: 'User activated successfully'
        }
    }
}
