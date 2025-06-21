import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('activities').del();

    // Get customer and user IDs for foreign key references
    const customers = await knex('customers').select('id', 'name', 'user_id');

    if (customers.length === 0) {
        throw new Error('No customers found in the database. Please run the customers seed first.');
    }

    const getRandomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    // Define date ranges - last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    // Helper function to get a random customer
    const getRandomCustomer = () => {
        return customers[Math.floor(Math.random() * customers.length)];
    };

    // Array of realistic activity types
    const activityTypes = ['call', 'email', 'meeting', 'deal'];

    // Create array of activities with realistic data
    const activities = [
        {
            type: 'call',
            description:
                'Called to follow up on the proposal discussed last week. Customer showed interest in the enterprise package.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'email',
            description:
                'Sent detailed pricing information and comparison sheet as requested. Waiting for feedback.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'meeting',
            description:
                'Met with the IT team to discuss technical requirements. They need additional information about API integration capabilities.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'deal',
            description:
                'Created new deal for software implementation project. Initial budget approved at 25,000 UZS.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'call',
            description:
                'Courtesy call to check satisfaction with recent implementation. Customer reported everything working well.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'email',
            description:
                'Sent quarterly newsletter with updates about new services and features available.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'meeting',
            description:
                'Quarterly review meeting with management. Discussed performance metrics and identified areas for improvement.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'call',
            description: 'Called to address recent support ticket. Issue resolved during the call.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'email',
            description: 'Sent contract renewal documents for next year service agreement.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'deal',
            description: 'Finalized additional module purchase. Added to existing contract.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'meeting',
            description:
                'Product demonstration for new team members. Showed all features and answered questions.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'call',
            description:
                'Introductory call with new potential client. Scheduled follow-up meeting next week.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'email',
            description: 'Shared case studies and success stories relevant to their industry.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'meeting',
            description: 'Met with finance department to discuss payment schedule and options.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'call',
            description: 'Called to inform about upcoming system maintenance window.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'email',
            description: 'Sent training materials and user guides for new staff.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'deal',
            description: 'Updated existing deal with new requirements and adjusted pricing.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'meeting',
            description:
                'Strategy session for upcoming project implementation. Created timeline and milestone plan.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'call',
            description:
                'Urgent call about system performance issue. Created ticket and escalated to support team.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            type: 'email',
            description: 'Sent invoice for recent services provided and payment instructions.',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
    ];

    // Insert activities
    await knex('activities').insert(activities);
}
