import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth.guard';
import { HttpRoleGuard } from 'src/common/guards/roles.guard';
import { AnalyticsService } from './analytics.service';
import { QuerySalesDto } from './dto/query-sales.dto';

@Controller('analytics')
@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('dashboard')
    @ApiOperation({ summary: 'Get dashboard statistics' })
    async getDashboard() {
        const data = await this.analyticsService.getDashboardStats();
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
