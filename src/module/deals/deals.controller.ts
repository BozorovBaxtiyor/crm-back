import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    Request,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateDealDto } from './dto/create-deal.dto';
import { QueryDealDto } from './dto/query-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealsService } from './deals.service';

@Controller('deals')
@ApiTags('Deals')
@ApiBearerAuth()
export class DealsController {
    constructor(private readonly dealsService: DealsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all deals' })
    @ApiQuery({ type: QueryDealDto })
    @ApiResponse({
        status: 200,
        description: 'List of deals with pagination',
        schema: {
            example: {
                success: true,
                data: {
                    deals: [
                        {
                            id: 1,
                            title: 'Software Implementation',
                            description: 'Implement new CRM system',
                            value: 5000,
                            status: 'in_progress',
                            customerId: 1,
                            customer: {
                                id: 1,
                                name: 'Acme Inc.',
                                company: 'Acme Corporation',
                            },
                            createdAt: '2025-06-20T00:00:00.000Z',
                            updatedAt: '2025-06-20T00:00:00.000Z',
                        },
                    ],
                    pagination: {
                        currentPage: 1,
                        totalPages: 1,
                        totalItems: 1,
                    },
                },
            },
        },
    })
    async findAll(@Query() query: QueryDealDto, @Request() req) {
        // For now, use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.dealsService.findAll(query, userId);
        return { success: true, data };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get deal by ID' })
    @ApiParam({ name: 'id', description: 'Deal ID' })
    @ApiResponse({
        status: 200,
        description: 'Deal found',
        schema: {
            example: {
                success: true,
                data: {
                    deal: {
                        id: 1,
                        title: 'Software Implementation',
                        description: 'Implement new CRM system',
                        value: 5000,
                        status: 'in_progress',
                        customerId: 1,
                        customer: {
                            id: 1,
                            name: 'Acme Inc.',
                            company: 'Acme Corporation',
                        },
                        createdAt: '2025-06-20T00:00:00.000Z',
                        updatedAt: '2025-06-20T00:00:00.000Z',
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Deal not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user?.id || 1;
        const data = await this.dealsService.findById(id, userId);
        return { success: true, data };
    }

    @Post()
    @ApiOperation({ summary: 'Create new deal' })
    @ApiResponse({
        status: 201,
        description: 'Deal created successfully',
        schema: {
            example: {
                success: true,
                data: {
                    deal: {
                        id: 1,
                        title: 'Software Implementation',
                        description: 'Implement new CRM system',
                        value: 5000,
                        status: 'new',
                        customerId: 1,
                        customer: {
                            id: 1,
                            name: 'Acme Inc.',
                            company: 'Acme Corporation',
                        },
                        createdAt: '2025-06-20T00:00:00.000Z',
                        updatedAt: '2025-06-20T00:00:00.000Z',
                    },
                },
            },
        },
    })
    async create(@Body() createDealDto: CreateDealDto, @Request() req) {
        const userId = req.user?.id || 1;
        const data = await this.dealsService.create(createDealDto, userId);
        return { success: true, data };
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update deal' })
    @ApiParam({ name: 'id', description: 'Deal ID' })
    @ApiResponse({
        status: 200,
        description: 'Deal updated successfully',
        schema: {
            example: {
                success: true,
                data: {
                    deal: {
                        id: 1,
                        title: 'Enhanced Software Implementation',
                        description: 'Implement new CRM system with training',
                        value: 7500,
                        status: 'in_progress',
                        customerId: 1,
                        customer: {
                            id: 1,
                            name: 'Acme Inc.',
                            company: 'Acme Corporation',
                        },
                        createdAt: '2025-06-20T00:00:00.000Z',
                        updatedAt: '2025-06-21T00:00:00.000Z',
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Deal not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDealDto: UpdateDealDto,
        @Request() req,
    ) {
        const userId = req.user?.id || 1;
        const data = await this.dealsService.update(id, updateDealDto, userId);
        return { success: true, data };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete deal' })
    @ApiParam({ name: 'id', description: 'Deal ID' })
    @ApiResponse({
        status: 200,
        description: 'Deal deleted successfully',
        schema: {
            example: {
                success: true,
                message: 'Deal deleted successfully',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Deal not found' })
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const userId = req.user?.id || 1;
        const result = await this.dealsService.delete(id, userId);
        return { success: true, ...result };
    }
}
