import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';

import { cookiesConfig } from 'src/config';
import { SignInDTO, SignUpDTO } from 'src/database/dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import mailer from 'src/helpers/mailer/mailer.helper';
import { ExpressRequest, ExpressResponse } from 'src/interfaces/general/general.interface';
import { AuthService } from '../services/auth/auth.service';
// import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    // @UseGuards(LocalAuthGuard)
    @Post("sign-in")
    async signIn(
        // @Request() req: ExpressRequest, 
        @Response() res: ExpressResponse,
        @Body() payload: SignInDTO
    ) {
        const token = await this.authService.signIn(payload)

        res.cookie(cookiesConfig.name, token, {
            httpOnly: true,
            expires: new Date(Date.now() + +cookiesConfig.expiration),
        })

        return res.json({ logged: true })
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

    @Delete("sign-out")
    async signOut(@Response() res: ExpressResponse) {
        res.clearCookie(cookiesConfig.name)
        return res.json({ logged: false })
    }
}
