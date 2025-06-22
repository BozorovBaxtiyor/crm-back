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
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { QueryDealDto } from './dto/query-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Controller('deals')
@ApiTags('Deals')
@ApiBearerAuth()
export class DealsController {
    constructor(private readonly dealsService: DealsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all deals' })
    @ApiQuery({ type: QueryDealDto })
    async findAll(@Query() query: QueryDealDto) {
        const data = await this.dealsService.findAll(query);
        return { success: true, data };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get deal by ID' })
    @ApiParam({ name: 'id', description: 'Deal ID' })
    @ApiResponse({ status: 404, description: 'Deal not found' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const data = await this.dealsService.findById(id);
        return { success: true, data };
    }

    @Post()
    @ApiOperation({ summary: 'Create new deal' })
    async create(@Body() createDealDto: CreateDealDto) {
        const data = await this.dealsService.create(createDealDto);
        return { success: true, data };
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update deal' })
    @ApiParam({ name: 'id', description: 'Deal ID' })
    @ApiResponse({ status: 404, description: 'Deal not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDealDto: UpdateDealDto,
        @Request() req,
    ) {
        const data = await this.dealsService.update(id, updateDealDto);
        return { success: true, data };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete deal' })
    @ApiParam({ name: 'id', description: 'Deal ID' })
    @ApiResponse({ status: 404, description: 'Deal not found' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        const result = await this.dealsService.delete(id);
        return { success: true, ...result };
    }
}
