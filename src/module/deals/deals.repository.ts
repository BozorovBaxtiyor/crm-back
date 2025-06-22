import { Injectable } from '@nestjs/common';
import db from 'src/database/knexfile1';
import { CreateDealDto } from './dto/create-deal.dto';
import { QueryDealDto } from './dto/query-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './entity/deal.entity';

@Injectable()
export class DealsRepository {
    async findAll(query: QueryDealDto): Promise<[Deal[], number]> {
        const { page = 1, limit = 10, status, customerId } = query;
        const offset = (page - 1) * limit;

        // Build base query for deals
        const dealQuery = db('deals')
            .select(
                'deals.id',
                'deals.title',
                'deals.description',
                'deals.value',
                'deals.status',
                'deals.customer_id as customerId',
                'deals.created_at as createdAt',
                'deals.updated_at as updatedAt',
            )
            .orderBy('deals.created_at', 'desc');

        // Apply filters if provided
        if (status) {
            dealQuery.andWhere('deals.status', status);
        }

        if (customerId) {
            dealQuery.andWhere('deals.customer_id', customerId);
        }

        // Get customers info for each deal
        const deals = await dealQuery
            .leftJoin('customers', 'deals.customer_id', 'customers.id')
            .select(
                'customers.id as customer_id',
                'customers.name as customer_name',
                'customers.company as customer_company',
            )
            .limit(limit)
            .offset(offset);

        // Build query to count total items
        const countQuery = db('deals');

        if (status) {
            countQuery.andWhere('status', status);
        }

        if (customerId) {
            countQuery.andWhere('customer_id', customerId);
        }

        const total = await countQuery.count('id as count').first();

        // Format the deals to include nested customer object
        const formattedDeals = deals.map(deal => ({
            id: deal.id,
            title: deal.title,
            description: deal.description,
            value: deal.value,
            status: deal.status,
            customerId: deal.customerId,
            customer: deal.customer_id
                ? {
                      id: deal.customer_id as number,
                      name: deal.customer_name as string,
                      company: deal.customer_company as string | undefined,
                  }
                : undefined,
            createdAt: deal.createdAt,
            updatedAt: deal.updatedAt,
        }));

        return [formattedDeals, Number(total?.count || 0)];
    }

    async findById(id: number): Promise<Deal | null> {
        const deal = await db('deals')
            .where({ 'deals.id': id})
            .leftJoin('customers', 'deals.customer_id', 'customers.id')
            .select(
                'deals.id',
                'deals.title',
                'deals.description',
                'deals.value',
                'deals.status',
                'deals.customer_id as customerId',
                'deals.created_at as createdAt',
                'deals.updated_at as updatedAt',
                'customers.id as customer_id',
                'customers.name as customer_name',
                'customers.company as customer_company',
            )
            .first();

        if (!deal) return null;

        return {
            ...deal,
            customer: deal.customer_id
                ? {
                      id: deal.customer_id,
                      name: deal.customer_name,
                      company: deal.customer_company,
                  }
                : null,
        };
    }

    async create(data: CreateDealDto): Promise<Deal> {
        const [dealId] = await db('deals')
            .insert({
                title: data.title,
                description: data.description,
                value: data.value,
                status: data.status || 'new',
                customer_id: data.customerId,
                user_id: 100,
            })
            .returning('id');

        const deal = await this.findById(dealId);
        if (!deal) {
            throw new Error('Failed to create deal: Deal not found after creation.');
        }
        return deal;
    }

    async update(id: number, data: UpdateDealDto): Promise<Deal | null> {
        const updateResult = await db('deals')
            .where({ id })
            .update({
                ...(data.title && { title: data.title }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.value !== undefined && { value: data.value }),
                ...(data.status && { status: data.status }),
                ...(data.customerId && { customer_id: data.customerId }),
                updated_at: new Date(),
            });

        if (updateResult === 0) return null;

        return this.findById(id);
    }

    async delete(id: number): Promise<boolean> {
        const result = await db('deals').delete();

        return result > 0;
    }
}
