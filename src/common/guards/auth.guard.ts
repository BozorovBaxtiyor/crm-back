// http-auth.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { JWT_ACCESS } from '../constants/jwt.constants';
import { ICustomRequest, IJwtPayload } from '../types/types';

@Injectable()
export class JwtHttpAuthGuard implements CanActivate {
    constructor(@Inject(JWT_ACCESS) private readonly jwtAccess: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<ICustomRequest>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtAccess.verifyAsync<IJwtPayload>(token);
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
