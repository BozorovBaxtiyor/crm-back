import { Body, Controller, Headers, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth.guard';
import { JwtRefreshGuard } from 'src/common/guards/jwt-refresh.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { ICustomRequest } from 'src/common/types/types';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Post('logout')
    @UseGuards(JwtHttpAuthGuard)
    async logout(@Headers('authorization') authHeader: string) {
        const token = authHeader?.replace('Bearer ', '');
        return this.authService.logout(token);
    }

    @Post('refresh')
    @UseGuards(JwtRefreshGuard)
    async refresh(@Req() req: ICustomRequest) {
        console.log(req.user);
        
        return this.authService.refreshToken(req.user.id);
    }
}
