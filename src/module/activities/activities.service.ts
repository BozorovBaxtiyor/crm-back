import { Injectable, NotFoundException } from '@nestjs/common';
import { ActivitiesRepository } from './activities.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(private readonly repository: ActivitiesRepository) {}

    async findAll(query: QueryActivityDto) {
        const [activities, total] = await this.repository.findAll(query);
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

    async create(dto: CreateActivityDto) {
        const activity = await this.repository.create(dto);
        return { activity };
    }
}
