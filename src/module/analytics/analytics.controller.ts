import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { QuerySalesDto } from './dto/query-sales.dto';

@Controller('analytics')
@ApiTags('Analytics')
@ApiBearerAuth()
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('dashboard')
    @ApiOperation({ summary: 'Get dashboard statistics' })
    @ApiResponse({
        status: 200,
        description: 'Dashboard statistics retrieved successfully',
        schema: {
            example: {
                success: true,
                data: {
                    totalCustomers: 125,
                    monthlySales: 45000,
                    activeDeals: 18,
                    conversionRate: 65.4,
                    customersByStatus: {
                        active: 75,
                        potential: 35,
                        waiting: 15,
                    },
                    salesTrend: [
                        {
                            month: '2025-01',
                            sales: 32000,
                        },
                        {
                            month: '2025-02',
                            sales: 45000,
                        },
                    ],
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    async getDashboard(@Request() req) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.analyticsService.getDashboardStats(userId);
        return { success: true, data };
    }

    @Get('sales')
    @ApiOperation({ summary: 'Get sales analytics' })
    @ApiQuery({ type: QuerySalesDto })
    @ApiResponse({
        status: 200,
        description: 'Sales analytics retrieved successfully',
        schema: {
            example: {
                success: true,
                data: {
                    totalSales: 125000,
                    salesByPeriod: [
                        {
                            period: '2025-01',
                            sales: 32000,
                            deals: 5,
                        },
                        {
                            period: '2025-02',
                            sales: 45000,
                            deals: 7,
                        },
                    ],
                    topCustomers: [
                        {
                            customerId: 1,
                            customerName: 'Acme Inc',
                            totalValue: 35000,
                        },
                        {
                            customerId: 2,
                            customerName: 'Globex Corp',
                            totalValue: 28000,
                        },
                    ],
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized',
    })
    async getSalesAnalytics(@Query() query: QuerySalesDto, @Request() req) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.analyticsService.getSalesAnalytics(query, userId);
        return { success: true, data };
    }
}
