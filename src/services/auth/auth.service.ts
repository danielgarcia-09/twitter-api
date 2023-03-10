import { Injectable } from '@nestjs/common';
import { SignInDTO } from '../../database/dto';
import { SignUpDTO } from '../../database/dto/auth/sign-up.dto';
import { UserEntity } from '../../database/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor( private readonly userService: UsersService) {}

    async validateUser(payload: SignInDTO): Promise<UserEntity | null> {
        const { username, password } = payload
        const user = await this.userService.findOne({
            where: { username }
        })

        if(user && user.isPasswordMatch(password)) {
            return user
        }

        return null
    }

    async signUp(data: SignUpDTO): Promise<UserEntity> {
        const entity = await this.userService.create(data);
        return entity
    }

    async signIn({username, password}: SignInDTO) {
        
    }
}
