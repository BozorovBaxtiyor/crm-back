import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/common/enums/roles.enum';
import { AnalyticsService } from './analytics.service';
import { QuerySalesDto } from './dto/query-sales.dto';

@Controller('analytics')
@ApiTags('Analytics')
@ApiBearerAuth()
// @UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('dashboard')
    @ApiQuery({
        name: 'period',
        required: false,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    })
    @ApiOperation({ summary: 'Get dashboard statistics' })
    async getDashboard(@Query('period') period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily') {
        const data = await this.analyticsService.getDashboardStats(period);
        console.log(data);
        return { success: true, data };
    }

    @Get('period/')
    @ApiQuery({
        name: 'period',
        required: false,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    })
    @ApiOperation({ summary: 'Get dashboard statistics for a specific period' })
    async getDashboardByPeriod(@Query('period') period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'daily') {
        const data = await this.analyticsService.getSalesTrend(period);
        return { success: true, data };
    }

    @Get('sales')
    @ApiOperation({ summary: 'Get sales analytics' })
    @ApiQuery({ type: QuerySalesDto })
    async getSalesAnalytics(@Query() query: QuerySalesDto) {
        const data = await this.analyticsService.getSalesAnalytics(query);
        return { success: true, data };
    }
}
