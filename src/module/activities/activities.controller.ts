import { Controller, Get, Post, Body, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';

@Controller('activities')
@ApiTags('Activities')
@ApiBearerAuth()
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all activities' })
    @ApiQuery({ type: QueryActivityDto })
    @ApiResponse({
        status: 200,
        description: 'List of activities',
        schema: {
            example: {
                success: true,
                data: {
                    activities: [
                        {
                            id: 1,
                            type: 'call',
                            description: 'Called to discuss project timeline',
                            customerId: 1,
                            customer: {
                                id: 1,
                                name: 'Acme Inc.',
                            },
                            createdAt: '2025-06-20T00:00:00.000Z',
                        },
                    ],
                    pagination: {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 1,
                        itemsPerPage: 10,
                    },
                },
            },
        },
    })
    async findAll(@Query() query: QueryActivityDto, @Request() req) {
        // For now, use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.activitiesService.findAll(query, userId);
        return { success: true, data };
    }

    @Post()
    @ApiOperation({ summary: 'Create new activity' })
    @ApiResponse({
        status: 201,
        description: 'Activity created successfully',
        schema: {
            example: {
                success: true,
                data: {
                    activity: {
                        id: 1,
                        type: 'call',
                        description: 'Called to discuss project timeline',
                        customerId: 1,
                        customer: {
                            id: 1,
                            name: 'Acme Inc.',
                        },
                        createdAt: '2025-06-20T00:00:00.000Z',
                    },
                },
            },
        },
    })
    async create(@Body() createActivityDto: CreateActivityDto, @Request() req) {
        // For now, use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.activitiesService.create(createActivityDto, userId);
        return { success: true, data };
    }
}
