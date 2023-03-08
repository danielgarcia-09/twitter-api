import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDTO } from 'src/database/dto';
import { LocalAuthGuard } from 'src/guards/local.guard';

import { SignUpDTO } from '../database/dto/auth/sign-up.dto';
import { AuthService } from '../services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("sign-in")
    async signIn(@Request() req) {
        return req.user
    }

    @Post("sign-up")
    async signUp(@Body() payload: SignUpDTO) {
        return this.authService.signUp(payload);
    }
}
