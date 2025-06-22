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
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorators';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth.guard';
import { HttpRoleGuard } from 'src/common/guards/roles.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@ApiTags('Customers')
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
@ApiBearerAuth()
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    @ApiOperation({ summary: 'Get all customers' })
    async findAll(@Query() query: QueryCustomerDto) {
        const data = await this.customerService.findAll(query);
        return { success: true, data };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get customer by ID' })
    @ApiParam({ name: 'id', description: 'Customer ID' })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        const data = await this.customerService.findById(id);
        return { success: true, data };
    }

    @Post()
    @ApiOperation({ summary: 'Create new customer' })
    async create(@Body() createCustomerDto: CreateCustomerDto) {
        const data = await this.customerService.create(createCustomerDto);
        return { success: true, data };
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update customer' })
    @ApiParam({ name: 'id', description: 'Customer ID' })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        const data = await this.customerService.update(id, updateCustomerDto);
        return { success: true, data };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer' })
    @ApiParam({ name: 'id', description: 'Customer ID' })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        const result = await this.customerService.delete(id);
        return { success: true, ...result };
    }
}
