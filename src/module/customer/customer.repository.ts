import { Injectable } from '@nestjs/common';
import db from 'src/database/knexfile1';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { Customer } from './entity/customer.entity';

@Injectable()
export class CustomerRepository {
    async findAll(query: QueryCustomerDto): Promise<[Customer[], number]> {
        const { page = 1, limit = 10, search, status } = query;
        const offset = (page - 1) * limit;

        const queryBuilder = db('customers')
            .select(
                'id',
                'name',
                'email',
                'phone',
                'company',
                'status',
                'value',
                'created_at as createdAt',
                'updated_at as updatedAt',
            );

        if (search) {
            queryBuilder.andWhere(builder => {
                builder
                    .where('name', 'ilike', `%${search}%`)
                    .orWhere('email', 'ilike', `%${search}%`)
                    .orWhere('company', 'ilike', `%${search}%`);
            });
        }

        if (status) {
            queryBuilder.andWhere({ status });
        }

        const totalQuery = db('customers');

        if (search) {
            totalQuery.andWhere(builder => {
                builder
                    .where('name', 'ilike', `%${search}%`)
                    .orWhere('email', 'ilike', `%${search}%`)
                    .orWhere('company', 'ilike', `%${search}%`);
            });
        }

        if (status) {
            totalQuery.andWhere({ status });
        }

        const total = await totalQuery.count('id as count').first();

        const customers = await queryBuilder
            .orderBy('created_at', 'desc')
            .limit(limit)
            .offset(offset);

        return [customers, Number(total?.count || 0)];
    }

    async findById(id: number): Promise<Customer | null> {
        return db('customers')
            .where({ id })
            .select(
                'id',
                'name',
                'email',
                'phone',
                'company',
                'status',
                'value',
                'created_at as createdAt',
                'updated_at as updatedAt',
            )
            .first();
    }

    async create(data: CreateCustomerDto): Promise<Customer> {
        const [result] = await db('customers')
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                company: data.company || null,
                status: data.status || 'potential',
                value: data.value || null,
            })
            .returning([
                'id',
                'name',
                'email',
                'phone',
                'company',
                'status',
                'value',
                'created_at as createdAt',
                'updated_at as updatedAt',
            ]);

        return result;
    }

    async update(id: number, data: UpdateCustomerDto): Promise<Customer | null> {
        const [result] = await db('customers')
            .where({ id: id })
            .update({
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
                ...(data.phone !== undefined && { phone: data.phone }),
                ...(data.company !== undefined && { company: data.company }),
                ...(data.status && { status: data.status }),
                ...(data.value !== undefined && { value: data.value }),
                updated_at: new Date(),
            })
            .returning([
                'id',
                'name',
                'email',
                'phone',
                'company',
                'status',
                'value',
                'created_at as createdAt',
                'updated_at as updatedAt',
            ]);

        return result || null;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db('customers').where({ id:id}).delete();

        return result > 0;
    }
}
