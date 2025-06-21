import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('deals').del();

    // Get customer IDs for foreign key references
    const customers = await knex('customers').select('id', 'user_id');

    if (customers.length === 0) {
        throw new Error('No customers found in the database. Please run the customers seed first.');
    }

    const getRandomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3); // Going back 3 months

    // Helper function to get a random customer and its associated user
    const getRandomCustomer = () => {
        return customers[Math.floor(Math.random() * customers.length)];
    };

    // Create array of deals with realistic data
    const deals = [
        {
            title: 'ERP System Implementation',
            description:
                'Implementation of enterprise resource planning system with full business process integration and staff training.',
            value: 45000.0,
            status: 'new',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'IT Infrastructure Upgrade',
            description:
                'Comprehensive upgrade of server infrastructure, network equipment and security systems.',
            value: 28500.0,
            status: 'in_progress',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Digital Marketing Campaign',
            description:
                'Three-month digital marketing campaign including social media, SEO and content marketing.',
            value: 12000.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Mobile App Development',
            description:
                'Custom mobile application development for iOS and Android platforms with backend integration.',
            value: 35000.0,
            status: 'in_progress',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Annual Software License Renewal',
            description:
                'Renewal of enterprise software licenses including support and maintenance for 12 months.',
            value: 8500.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Data Center Migration',
            description:
                'Migration of existing on-premise data center to cloud infrastructure with minimal downtime.',
            value: 54000.0,
            status: 'new',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Corporate Website Redesign',
            description:
                'Complete redesign of corporate website with responsive design, content management system and SEO optimization.',
            value: 15000.0,
            status: 'in_progress',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Cybersecurity Assessment',
            description:
                'Comprehensive security assessment including vulnerability scanning, penetration testing and security policy review.',
            value: 18500.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Analytics Dashboard Development',
            description:
                'Custom analytics dashboard development with real-time data integration and business intelligence features.',
            value: 22000.0,
            status: 'new',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'E-commerce Platform Integration',
            description:
                'Integration of e-commerce platform with existing systems including inventory, CRM and accounting software.',
            value: 31000.0,
            status: 'in_progress',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Staff Training Program',
            description:
                'Comprehensive training program for staff on new software systems and security awareness.',
            value: 9500.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'CRM System Customization',
            description:
                'Custom development and modification of CRM system to meet specific business requirements.',
            value: 17500.0,
            status: 'new',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Network Infrastructure Maintenance',
            description:
                'Annual maintenance contract for network infrastructure including emergency support and regular health checks.',
            value: 12000.0,
            status: 'in_progress',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Business Process Automation',
            description:
                'Implementation of workflow automation for key business processes to improve efficiency and reduce manual work.',
            value: 27500.0,
            status: 'cancelled',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Data Analytics Consulting',
            description:
                'Strategic consulting services for data analytics implementation and business intelligence strategy.',
            value: 21000.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Cloud Migration Strategy',
            description:
                'Development of comprehensive cloud migration roadmap and implementation strategy.',
            value: 15000.0,
            status: 'new',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'IT Security Compliance',
            description:
                'Implementation of security controls and procedures to ensure compliance with industry regulations.',
            value: 23500.0,
            status: 'in_progress',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Disaster Recovery Planning',
            description:
                'Development of comprehensive disaster recovery and business continuity plans with testing procedures.',
            value: 18000.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'API Development Services',
            description:
                'Development of RESTful APIs for system integration and third-party connectivity.',
            value: 14500.0,
            status: 'cancelled',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
        {
            title: 'Hardware Supply Contract',
            description:
                'Supply of enterprise-grade hardware including workstations, servers and networking equipment.',
            value: 42000.0,
            status: 'completed',
            customer_id: getRandomCustomer().id,
            user_id: getRandomCustomer().user_id,
            created_at: getRandomDate(startDate, endDate),
        },
    ];

    // Add updated_at field to match created_at
    const dealsWithUpdates = deals.map(deal => ({
        ...deal,
        updated_at: deal.created_at,
    }));

    // Insert deals
    await knex('deals').insert(dealsWithUpdates);
}
