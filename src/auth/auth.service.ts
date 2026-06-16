import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    //Nuestro usuario simulado
    private usuarioSimulado = {
        id:1,
        email: "admin@gmail.com",
        passwordHash:"asdasdasdasadsdasfdsdfgfdf",
        rol:"ADMIN"
    }

    constructor( private JwtService : JwtService){}

    // metodo login
    async login(email: string, passwordPlano: string){
        //validar si existe o no el usuario
        if (email != this.usuarioSimulado.email) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos')
        }

        //validar la contrasenia
        const passwordValid = passwordPlano === "Admin123456"
        if (!passwordValid) {
            throw new UnauthorizedException('Usuario o contraseña incorrectos')
        }

        const payload = {
            sub: this.usuarioSimulado.id,
            email:this.usuarioSimulado.email,
            rol: this.usuarioSimulado.rol
        }

        return{
            access_token: await this.JwtService.signAsync(payload)
        }
    }


}
