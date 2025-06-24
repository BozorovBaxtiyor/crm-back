import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('activities').del();

    // Get customer and user IDs for foreign key references
    const customers = await knex('customers').select('id', 'name');

    if (customers.length === 0) {
        throw new Error('No customers found in the database. Please run the customers seed first.');
    }

    const getRandomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    // Define date range (last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const getRandomCustomer = () => {
        return customers[Math.floor(Math.random() * customers.length)];
    };

    const activityTypes = ['call', 'email', 'meeting', 'deal'];

    const getRandomActivityType = () => {
        return activityTypes[Math.floor(Math.random() * activityTypes.length)];
    };

    const descriptions = {
        call: [
            'Followed up on previous meeting.',
            'Discussed new features.',
            'Provided update on implementation.',
            'Talked about pricing concerns.',
            'Answered product questions.'
        ],
        email: [
            'Sent proposal and quote.',
            'Provided onboarding documentation.',
            'Followed up with contract.',
            'Shared product roadmap.',
            'Requested feedback on service.'
        ],
        meeting: [
            'Held discovery call.',
            'Demo session with key team members.',
            'Quarterly review meeting.',
            'Kick-off project meeting.',
            'Discussed SLA and expectations.'
        ],
        deal: [
            'Closed new enterprise deal.',
            'Negotiated pricing and contract terms.',
            'Received verbal confirmation of purchase.',
            'Deal marked as won.',
            'Initiated procurement process.'
        ]
    };

    const getRandomDescription = (type: string) => {
        const list = descriptions[type as keyof typeof descriptions] || [];
        return list[Math.floor(Math.random() * list.length)];
    };

    // Generate 40 random activities
    const activities = Array.from({ length: 100 }, () => {
        const type = getRandomActivityType();
        const customer = getRandomCustomer();
        return {
            type,
            description: getRandomDescription(type),
            customer_id: customer.id,
            created_at: getRandomDate(startDate, endDate),
        };
    });

    await knex('activities').insert(activities);
}
