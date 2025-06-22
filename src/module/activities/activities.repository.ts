import { Injectable } from '@nestjs/common';
import db from 'src/database/knexfile1';
import { CreateActivityDto } from './dto/create-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';
import { Activity } from './entity/activity.entity';

@Injectable()
export class ActivitiesRepository {
    async findAll(query: QueryActivityDto): Promise<[Activity[], number]> {
        const { page = 1, limit = 10, type, customerId } = query;
        const offset = (page - 1) * limit;

        const activityQuery = db('activities')
            .select(
                'activities.id',
                'activities.type',
                'activities.description',
                'activities.customer_id as customerId',
                'activities.created_at as createdAt',
            )
            .orderBy('activities.created_at', 'desc');

        if (type) {
            activityQuery.andWhere('activities.type', type);
        }

        if (customerId) {
            activityQuery.andWhere('activities.customer_id', customerId);
        }

        // Get customers info for each activity
        const activities = await activityQuery
            .leftJoin('customers', 'activities.customer_id', 'customers.id')
            .select('customers.id as customer_id', 'customers.name as customer_name')
            .limit(limit)
            .offset(offset);

        const countQuery = db('activities');

        if (type) {
            countQuery.andWhere('type', type);
        }

        if (customerId) {
            countQuery.andWhere('customer_id', customerId);
        }

        const total = await countQuery.count('id as count').first();

        // Format the activities to include nested customer object
        const formattedActivities = activities.map(activity => ({
            id: activity.id,
            type: activity.type,
            description: activity.description,
            customerId: activity.customerId,
            customer: activity.customer_id
                ? {
                      id: activity.customer_id as number,
                      name: activity.customer_name as string,
                  }
                : undefined,
            createdAt: activity.createdAt,
        }));

        return [formattedActivities, Number(total?.count || 0)];
    }

    async create(data: CreateActivityDto): Promise<Activity> {
        const [activityId] = await db('activities')
            .insert({
                type: data.type,
                description: data.description,
                customer_id: data.customerId,
                user_id: 100,
            })
            .returning('id');

        console.log(data, 'data', activityId, 'activityId');

        const activity = await db('activities')
            .where({ 'activities.id': activityId.id })
            .leftJoin('customers', 'activities.customer_id', 'customers.id')
            .select(
                'activities.id',
                'activities.type',
                'activities.description',
                'activities.customer_id as customerId',
                'activities.created_at as createdAt',
                'customers.id as customer_id',
                'customers.name as customer_name',
            )
            .first();

        if (!activity) {
            throw new Error('Failed to create activity: Activity not found after creation.');
        }

        return {
            id: activity.id,
            type: activity.type,
            description: activity.description,
            customerId: activity.customerId,
            customer: activity.customer_id
                ? {
                      id: activity.customer_id,
                      name: activity.customer_name,
                  }
                : undefined,
            createdAt: activity.createdAt,
        };
    }
}
