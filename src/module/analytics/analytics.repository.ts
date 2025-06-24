import { Injectable } from '@nestjs/common';
import db from 'src/database/knexfile1';
import { QuerySalesDto } from './dto/query-sales.dto';

@Injectable()
export class AnalyticsRepository {
    async getDashboardStats() {
        const totalCustomersResult = await db('customers').count('id as count').first();
        const totalCustomers = totalCustomersResult?.count ?? 0;

        // Get monthly sales (completed deals in the current month)
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const monthlySalesResult = await db('deals')
            .where({ status: 'completed' })
            .where('created_at', '<=', lastDayOfMonth)
            .where('created_at', '>=', firstDayOfMonth)
            .sum('value as sum')
            .first();

        const monthlySales = monthlySalesResult?.sum ?? 0;

        const activeDeals = await db('deals')
            .whereIn('status', ['new', 'in_progress'])
            .count('id as count')
            .first();

        const customersByStatus = await db('customers')
            .select('status')
            .count('id as count')
            .groupBy('status');

        // Calculate conversion rate (completed deals / total deals)
        const completedDealsResult = await db('deals')
            .where({ status: 'completed' })
            .count('id as count')
            .first();

        const completedDeals = completedDealsResult?.count ?? 0;

        const totalDealsResult = await db('deals').count('id as count').first();

        const totalDeals = totalDealsResult?.count ?? 0;

        const conversionRate =
            Number(totalDeals) > 0 ? (Number(completedDeals) / Number(totalDeals)) * 100 : 0;

        // Get sales trend for the last 6 months
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const salesTrend = await db('deals')
            .where({ status: 'completed' })
            .where('created_at', '>=', sixMonthsAgo)
            .select(db.raw("to_char(created_at, 'YYYY-MM') as month"))
            .sum('value as sales')
            .groupBy('month')
            .orderBy('month');

        // Format customer status counts into an object
        const customerStatusCounts = {
            active: 0,
            potential: 0,
            waiting: 0,
        };

        customersByStatus.forEach(statusGroup => {
            customerStatusCounts[statusGroup.status] = Number(statusGroup.count);
        });

        return {
            totalCustomers: Number(totalCustomers) || 0,
            monthlySales: Number(monthlySales) || 0,
            activeDeals: Number(activeDeals?.count) || 0,
            conversionRate: parseFloat(conversionRate.toFixed(2)) || 0,
            customersByStatus: customerStatusCounts,
            salesTrend: salesTrend.map(item => ({
                month: item.month,
                sales: Number(item.sales) || 0,
            })),
        };
    }

    async getSalesAnalytics(query: QuerySalesDto) {
        const { startDate, endDate, period } = query;

        // Set default date range if not provided
        const start = startDate
            ? new Date(startDate)
            : new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        const end = endDate ? new Date(endDate) : new Date();

        // Format for time period grouping based on selected period
        let timeFormat;
        switch (period) {
            case 'daily':
                timeFormat = 'YYYY-MM-DD';
                break;
            case 'weekly':
                timeFormat = 'YYYY-IW'; // ISO week
                break;
            case 'yearly':
                timeFormat = 'YYYY';
                break;
            case 'monthly':
            default:
                timeFormat = 'YYYY-MM';
                break;
        }

        // Get total sales in the selected period
        const totalSales = await db('deals')
            .where({ status: 'completed' })
            .whereBetween('created_at', [start, end])
            .sum('value as sum')
            .first();

        // Get sales by period
        const salesByPeriod = await db('deals')
            .where({ status: 'completed' })
            .whereBetween('created_at', [start, end])
            .select(db.raw(`to_char(created_at, '${timeFormat}') as period`))
            .sum('value as sales')
            .count('id as deals')
            .groupBy('period')
            .orderBy('period');

        // Get top customers by sales value
        const topCustomers = await db('deals')
            .where({ 'deals.status': 'completed' })
            .whereBetween('deals.created_at', [start, end])
            .join('customers', 'deals.customer_id', 'customers.id')
            .select('customers.id as customerId', 'customers.name as customerName')
            .sum('deals.value as totalValue')
            .groupBy('customers.id', 'customers.name')
            .orderBy('totalValue', 'desc')
            .limit(5);

        return {
            totalSales: Number(totalSales) || 0,
            salesByPeriod: salesByPeriod.map(item => ({
                period: item.period,
                sales: Number(item.sales) || 0,
                deals: Number(item.deals) || 0,
            })),
            topCustomers: topCustomers.map(customer => ({
                customerId: customer.customerId,
                customerName: customer.customerName,
                totalValue: Number(customer.totalValue) || 0,
            })),
        };
    }
}
