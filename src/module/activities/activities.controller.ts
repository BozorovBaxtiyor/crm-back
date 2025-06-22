import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth.guard';
import { HttpRoleGuard } from 'src/common/guards/roles.guard';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';

@Controller('activities')
@ApiTags('Activities')
@ApiBearerAuth()
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all activities' })
    async findAll(@Query() query: QueryActivityDto) {
        const data = await this.activitiesService.findAll(query);
        return { success: true, data };
    }

    @Post()
    @ApiOperation({ summary: 'Create new activity' })
    async create(@Body() createActivityDto: CreateActivityDto) {
        const data = await this.activitiesService.create(createActivityDto);
        return { success: true, data };
    }
}
