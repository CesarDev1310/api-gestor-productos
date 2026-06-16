import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    inciarSesion(@Body() singInDto: Record<string, any>){
        return this.authService.login(singInDto.email, singInDto.password)
    }
}
