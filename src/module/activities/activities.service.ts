import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivitiesRepository } from './activities.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(private readonly repository: ActivitiesRepository) {}

    async findAll(query: QueryActivityDto, userId: number) {
        const [activities, total] = await this.repository.findAll(query, userId);
        const totalPages = Math.ceil(total / (query.limit || 10));

        return {
            activities,
            pagination: {
                currentPage: query.page || 1,
                totalPages,
                totalItems: total,
                itemsPerPage: query.limit || 10,
            },
        };
    }

    async create(dto: CreateActivityDto, userId: number) {
        const activity = await this.repository.create(dto, userId);
        return { activity };
    }
}
