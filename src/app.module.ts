import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './module/customer/customer.module';
import { DealsModule } from './module/deals/deals.module';
import { ActivitiesModule } from './module/activities/activities.module';
import { AnalyticsModule } from './module/analytics/analytics.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        CustomerModule,
        DealsModule,
        ActivitiesModule,
        AnalyticsModule
    ],
})
export class AppModule {}
