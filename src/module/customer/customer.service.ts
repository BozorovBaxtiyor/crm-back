import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
    constructor(private readonly repository: CustomerRepository) {}

    async findAll(query: QueryCustomerDto) {
        const [customers, total] = await this.repository.findAll(query);
        const totalPages = Math.ceil(total / (query.limit || 10));

        return {
            customers,
            pagination: {
                currentPage: query.page || 1,
                totalPages,
                totalItems: total,
                itemsPerPage: query.limit || 10,
            },
        };
    }

    async findById(id: number) {
        const customer = await this.repository.findById(id);
        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        return { customer };
    }

    async create(dto: CreateCustomerDto) {
        const customer = await this.repository.create(dto);
        return { customer };
    }

    async update(id: number, dto: UpdateCustomerDto) {
        const customer = await this.repository.update(id, dto);
        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        return { customer };
    }

    async delete(id: number) {
        const deleted = await this.repository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        return { message: 'Customer deleted successfully' };
    }
}
