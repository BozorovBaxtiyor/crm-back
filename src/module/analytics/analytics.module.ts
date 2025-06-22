import { Module } from '@nestjs/common';
import { JwtAuthModule } from '../auth/jwt-auth.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsService } from './analytics.service';

@Module({
    controllers: [AnalyticsController],
    providers: [AnalyticsService, AnalyticsRepository],
    imports: [JwtAuthModule],
})
export class AnalyticsModule {}
