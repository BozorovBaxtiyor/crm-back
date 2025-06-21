import { Injectable, NotFoundException } from '@nestjs/common';
import { DealsRepository } from './deals.repository';
import { CreateDealDto } from './dto/create-deal.dto';
import { QueryDealDto } from './dto/query-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealsService {
    constructor(private readonly repository: DealsRepository) {}

    async findAll(query: QueryDealDto, userId: number) {
        const [deals, total] = await this.repository.findAll(query, userId);
        const totalPages = Math.ceil(total / (query.limit || 10));

        return {
            deals,
            pagination: {
                currentPage: query.page || 1,
                totalPages,
                totalItems: total,
            },
        };
    }

    async findById(id: number, userId: number) {
        const deal = await this.repository.findById(id, userId);
        if (!deal) {
            throw new NotFoundException(`Deal with ID ${id} not found`);
        }
        return { deal };
    }

    async create(dto: CreateDealDto, userId: number) {
        const deal = await this.repository.create(dto, userId);
        return { deal };
    }

    async update(id: number, dto: UpdateDealDto, userId: number) {
        const deal = await this.repository.update(id, dto, userId);
        if (!deal) {
            throw new NotFoundException(`Deal with ID ${id} not found`);
        }
        return { deal };
    }

    async delete(id: number, userId: number) {
        const deleted = await this.repository.delete(id, userId);
        if (!deleted) {
            throw new NotFoundException(`Deal with ID ${id} not found`);
        }
        return { message: 'Deal deleted successfully' };
    }
}
