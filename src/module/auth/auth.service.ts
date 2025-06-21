import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly repo: AuthRepository,
        private readonly configService: ConfigService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.repo.findByEmail(dto.email);
        
        if (!user || !(await bcrypt.compare(dto.password, user.password_hash))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const jwtRefreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

        if (!jwtSecret || !jwtRefreshSecret) {
            // This is a server configuration issue, not a user error.
            throw new InternalServerErrorException('JWT secret or refresh secret is not defined');
        }

        const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ sub: user.id }, jwtRefreshSecret, { expiresIn: '7d' });

        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
                token,
                refreshToken,
            },
        };
    }

    async logout(token: string) {
        // Optional: tokenni blacklist qilish mumkin
        return {
            success: true,
            message: 'Successfully logged out',
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
            const jwtSecret = this.configService.get<string>('JWT_SECRET');
            if (!refreshSecret || !jwtSecret) {
                throw new InternalServerErrorException(
                    'JWT refresh secret or JWT secret is not defined',
                );
            }

            const payload = jwt.verify(refreshToken, refreshSecret) as any;

            const token = jwt.sign({ sub: payload.sub }, jwtSecret, { expiresIn: '15m' });
            const newRefreshToken = jwt.sign({ sub: payload.sub }, refreshSecret, {
                expiresIn: '7d',
            });

            return {
                success: true,
                data: {
                    token,
                    refreshToken: newRefreshToken,
                },
            };
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
