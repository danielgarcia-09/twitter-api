import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDTO } from 'src/database/dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { ExpressRequest } from 'src/interfaces/general/general.interface';

import { SignUpDTO } from '../database/dto/auth/sign-up.dto';
import { AuthService } from '../services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    // @UseGuards(LocalAuthGuard)
    @Post("sign-in")
    async signIn(@Request() req: ExpressRequest, @Body() payload: SignInDTO) {
        // const user = req.client
        return this.authService.signIn(payload /*user*/)
    }

    @Post("sign-up")
    async signUp(@Body() payload: SignUpDTO) {
        return this.authService.signUp(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async me(@Request() req: ExpressRequest) {
        return req.client
    }
}
