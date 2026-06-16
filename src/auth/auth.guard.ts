import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private JwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const peticion = context.switchToHttp().getRequest();

        const token = this.extraerTokenDeCabera(peticion);
        if (!token) {
            throw new UnauthorizedException('No tiene permisos para entrar a esta url')
        }

        try {
            const payload = await this.JwtService.verifyAsync(
                token,
                {
                    secret: 'llave_secreta@12456789'
                }
            );

            peticion['usuario'] = payload;

        } catch {
            throw new UnauthorizedException('El token es invalido o ha expirado')
        }
        
        return true; // El vigilante te da acceso
    }


    private extraerTokenDeCabera(request: Request): string | undefined {
        const cabeceraAuth = request.headers.authorization;
        if (!cabeceraAuth) return undefined
        const [tipo, token] = cabeceraAuth.split(' ');
        return tipo == 'Bearer' ? token : undefined
    }


}