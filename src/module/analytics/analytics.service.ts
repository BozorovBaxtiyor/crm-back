import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './analytics.repository';
import { QuerySalesDto } from './dto/query-sales.dto';

@Injectable()
export class AnalyticsService {
    constructor(private readonly repository: AnalyticsRepository) {}

    async getDashboardStats() {
        return this.repository.getDashboardStats();
    }

    async getSalesAnalytics(query: QuerySalesDto) {
        return this.repository.getSalesAnalytics(query);
    }
}
