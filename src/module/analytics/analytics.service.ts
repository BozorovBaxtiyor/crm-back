import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';
import { QuerySalesDto } from './dto/query-sales.dto';

@Injectable()
export class AnalyticsService {
    constructor(private readonly repository: AnalyticsRepository) {}

    async getDashboardStats(userId: number) {
        return this.repository.getDashboardStats(userId);
    }

    async getSalesAnalytics(query: QuerySalesDto, userId: number) {
        return this.repository.getSalesAnalytics(query, userId);
    }
}
