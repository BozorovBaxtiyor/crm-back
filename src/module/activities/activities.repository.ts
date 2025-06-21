import { Injectable } from '@nestjs/common';
import db from 'src/database/knexfile1';
import { Activity } from './entity/activity.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { QueryActivityDto } from './dto/query-activity.dto';

@Injectable()
export class ActivitiesRepository {
    async findAll(query: QueryActivityDto, userId: number): Promise<[Activity[], number]> {
        const { page = 1, limit = 10, type, customerId } = query;
        const offset = (page - 1) * limit;

        // Build base query for activities
        const activityQuery = db('activities')
            .where({ user_id: userId })
            .select(
                'activities.id',
                'activities.type',
                'activities.description',
                'activities.customer_id as customerId',
                'activities.created_at as createdAt',
            )
            .orderBy('activities.created_at', 'desc');

        // Apply filters if provided
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

        // Build query to count total items
        const countQuery = db('activities').where({ user_id: userId });

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

    async create(data: CreateActivityDto, userId: number): Promise<Activity> {
        const [activityId] = await db('activities')
            .insert({
                type: data.type,
                description: data.description,
                customer_id: data.customerId,
                user_id: userId,
            })
            .returning('id');

        // Fetch the created activity with customer information
        const activity = await db('activities')
            .where({ 'activities.id': activityId })
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
