// http-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { ICustomRequest, IJwtPayload } from '../types/types';

@Injectable()
export class JwtHttpAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
         const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const request = context.switchToHttp().getRequest<ICustomRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtService.verifyAsync<IJwtPayload>(token, {
                secret: jwtSecret,
            });
            request.user = payload;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }

    private extractTokenFromHeader(request: ICustomRequest): string | null {
        const expressRequest = request as unknown as Request;
        const [type, token] = expressRequest.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}
