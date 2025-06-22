import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { DealsRepository } from './deals.repository';
import { JwtAuthModule } from '../auth/jwt-auth.module';

@Module({
    imports: [JwtAuthModule],
    controllers: [DealsController],
    providers: [DealsService, DealsRepository],
    exports: [DealsService],
})
export class DealsModule {}
