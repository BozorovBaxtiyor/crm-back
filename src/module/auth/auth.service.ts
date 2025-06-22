import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JWT_ACCESS, JWT_REFRESH } from 'src/common/constants/jwt.constants';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly repo: AuthRepository,
        private readonly configService: ConfigService,
        @Inject(JWT_ACCESS) private readonly jwtAccess: JwtService,
        @Inject(JWT_REFRESH) private readonly jwtRefresh: JwtService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.repo.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!(await bcrypt.compare(dto.password, user.password_hash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwtAccess.signAsync({
            id: user.id,
            role: user.role,
            email: user.email,
        });
        const refreshToken = await this.jwtRefresh.signAsync({ id: user.id });
        return {
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
                token,
                refreshToken,
            },
        };
    }

    async logout(token: string) {
        return {
            success: true,
            message: 'Successfully logged out',
        };
    }

    async refreshToken(id: number) {
        try {
            console.log(id);
            
            const user = await this.repo.findById(id);
            if (!user) throw new NotFoundException('User not found');
            const token = await this.jwtAccess.signAsync({
                sub: user.id,
                role: user.role,
                email: user.email,
            });
            const refreshToken = await this.jwtRefresh.signAsync({ sub: user.id });
            return {
                success: true,
                data: {
                    token,
                    refreshToken,
                },
            };
        } catch (error) {
            console.log(error);

            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
