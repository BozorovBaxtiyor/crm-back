import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';
import { QuerySalesDto } from './dto/query-sales.dto';

@Injectable()
export class AnalyticsService {
    constructor(private readonly repository: AnalyticsRepository) {}

    async getDashboardStats(period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly') {
        return this.repository.getDashboardStats(period);
    }

    async getSalesAnalytics(query: QuerySalesDto) {
        return this.repository.getSalesAnalytics(query);
    }
    async getSalesTrend(period: 'daily' | 'weekly' | 'monthly' | 'yearly') {
        return this.repository.getSalesTrend(period);
    }
}
