import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
    Request,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
// Note: You'll need to create an AuthGuard for JWT protection
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
@ApiTags('Customers')
// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Get()
    @ApiOperation({ summary: 'Get all customers' })
    @ApiQuery({ type: QueryCustomerDto })
    @ApiResponse({
        status: 200,
        description: 'Customer list with pagination',
        schema: {
            example: {
                success: true,
                data: {
                    customers: [
                        {
                            id: 1,
                            name: 'John Doe',
                            email: 'john@example.com',
                            phone: '+998901234567',
                            company: 'Acme Inc.',
                            status: 'active',
                            value: 'High',
                            createdAt: '2025-06-20T18:00:00Z',
                            updatedAt: '2025-06-20T18:00:00Z',
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
    async findAll(@Query() query: QueryCustomerDto, @Request() req) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.customerService.findAll(query, userId);
        return { success: true, data };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get customer by ID' })
    @ApiParam({ name: 'id', description: 'Customer ID' })
    @ApiResponse({
        status: 200,
        description: 'Customer found',
        schema: {
            example: {
                success: true,
                data: {
                    customer: {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+998901234567',
                        company: 'Acme Inc.',
                        status: 'active',
                        value: 'High',
                        createdAt: '2025-06-20T18:00:00Z',
                        updatedAt: '2025-06-20T18:00:00Z',
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.customerService.findById(id, userId);
        return { success: true, data };
    }

    @Post()
    @ApiOperation({ summary: 'Create new customer' })
    @ApiResponse({
        status: 201,
        description: 'Customer created successfully',
        schema: {
            example: {
                success: true,
                data: {
                    customer: {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+998901234567',
                        company: 'Acme Inc.',
                        status: 'potential',
                        value: 'Medium',
                        createdAt: '2025-06-20T18:00:00Z',
                        updatedAt: '2025-06-20T18:00:00Z',
                    },
                },
            },
        },
    })
    async create(@Body() createCustomerDto: CreateCustomerDto, @Request() req) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.customerService.create(createCustomerDto, userId);
        return { success: true, data };
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update customer' })
    @ApiParam({ name: 'id', description: 'Customer ID' })
    @ApiResponse({
        status: 200,
        description: 'Customer updated successfully',
        schema: {
            example: {
                success: true,
                data: {
                    customer: {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        phone: '+998901234567',
                        company: 'Acme Inc.',
                        status: 'active',
                        value: 'High',
                        createdAt: '2025-06-20T18:00:00Z',
                        updatedAt: '2025-06-20T18:00:00Z',
                    },
                },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
        @Request() req,
    ) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const data = await this.customerService.update(id, updateCustomerDto, userId);
        return { success: true, data };
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete customer' })
    @ApiParam({ name: 'id', description: 'Customer ID' })
    @ApiResponse({
        status: 200,
        description: 'Customer deleted successfully',
        schema: {
            example: {
                success: true,
                message: 'Customer deleted successfully',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Customer not found' })
    async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
        // For now, we'll use a hardcoded userId until you implement auth
        const userId = req.user?.id || 1;
        const result = await this.customerService.delete(id, userId);
        return { success: true, ...result };
    }
}
