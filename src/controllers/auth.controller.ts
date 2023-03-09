import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';

import { AppModule } from 'src/app.module';
import { SignInDTO, SignUpDTO } from 'src/database/dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExpressRequest, ExpressResponse } from 'src/interfaces/general/general.interface';
import { AuthService } from '../services/auth/auth.service';
// import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService
    ) { }

    // @UseGuards(LocalAuthGuard)
    @Post("sign-in")
    async signIn(
        // @Request() req: ExpressRequest, 
        @Response() res: ExpressResponse, 
        @Body() payload: SignInDTO
    ) {
        const token = await this.authService.signIn(payload)
        
        res.cookie(AppModule.cookie_name, token, {
            httpOnly: true,
            expires: new Date(Date.now() + +AppModule.cookie_expiration),
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
        res.clearCookie(AppModule.cookie_name)
        return res.json({ logged: false })
    }
}
