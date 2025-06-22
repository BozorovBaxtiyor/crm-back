import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthModule } from './jwt-auth.module';

@Module({
  imports: [ConfigModule, JwtAuthModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
