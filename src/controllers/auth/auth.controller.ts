import { Body, Controller, Delete, Get, Param, Patch, Post, Request, Response, UseGuards } from '@nestjs/common';

import { cookiesConfig } from 'src/config';
import { SignInDTO, SignUpDTO } from 'src/database/dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExpressRequest, ExpressResponse } from 'src/interfaces/general/general.interface';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("sign-in")
    async signIn(
        @Response() res: ExpressResponse,
        @Body() payload: SignInDTO
    ) {
        const token = await this.authService.signIn(payload)

        res.cookie(cookiesConfig.name, token, {
            httpOnly: true,
            expires: new Date(Date.now() + +cookiesConfig.expiration),
        })

        return res.status(200).json({ logged: true })
    }

    @Post("sign-up")
    async signUp(@Body() payload: SignUpDTO) {
        return await this.authService.signUp(payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async me(@Request() req: ExpressRequest) {
        return req.client
    }

    @UseGuards(JwtAuthGuard)
    @Delete("sign-out")
    async signOut(@Response() res: ExpressResponse): Promise<ExpressResponse> {
        res.clearCookie(cookiesConfig.name)
        return res.json({ logged: false })
    }

    @Patch("confirm-email/:token")
    async confirmEmail(@Param("token") token: string) {
        return await this.authService.confirmEmail(token)
    }
}
