import { Module } from '@nestjs/common';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { ActivitiesRepository } from './activities.repository';
import { ConfigModule } from '@nestjs/config';
import { JwtHttpAuthGuard } from 'src/common/guards/auth.guard';
import { JwtAuthModule } from '../auth/jwt-auth.module';

@Module({
    imports: [JwtAuthModule],
    controllers: [ActivitiesController],
    providers: [ActivitiesService, ActivitiesRepository],
    exports: [ActivitiesService],
})
export class ActivitiesModule {}
