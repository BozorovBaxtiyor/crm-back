import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('deals').del();

    // Get customer IDs for foreign key references
    const customers = await knex('customers').select('id');

    if (customers.length === 0) {
        throw new Error('No customers found in the database. Please run the customers seed first.');
    }

    const getRandomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const getRandomCustomer = () => {
        return customers[Math.floor(Math.random() * customers.length)];
    };

    const statusOptions = ['new', 'in_progress', 'completed', 'cancelled'];

    const getRandomStatus = () => {
        return statusOptions[Math.floor(Math.random() * statusOptions.length)];
    };

    const titles = [
        'ERP System Implementation',
        'IT Infrastructure Upgrade',
        'Digital Marketing Campaign',
        'Mobile App Development',
        'Annual Software License Renewal',
        'Data Center Migration',
        'Corporate Website Redesign',
        'Cybersecurity Assessment',
        'Analytics Dashboard Development',
        'E-commerce Platform Integration',
        'Staff Training Program',
        'CRM System Customization',
        'Network Infrastructure Maintenance',
        'Business Process Automation',
        'Data Analytics Consulting',
        'Cloud Migration Strategy',
        'IT Security Compliance',
        'Disaster Recovery Planning',
        'API Development Services',
        'Hardware Supply Contract',
    ];

    const getRandomTitle = () => {
        return titles[Math.floor(Math.random() * titles.length)];
    };
    const descriptions = [
        'Implementation of enterprise resource planning system with full business process integration and staff training.',
        'Comprehensive upgrade of server infrastructure, network equipment and security systems.',
        'Three-month digital marketing campaign including social media, SEO and content marketing.',
        'Custom mobile application development for iOS and Android platforms with backend integration.',
        'Renewal of enterprise software licenses including support and maintenance for 12 months.',
        'Migration of existing on-premise data center to cloud infrastructure with minimal downtime.',
        'Complete redesign of corporate website with responsive design, content management system and SEO optimization.',
        'Comprehensive security assessment including vulnerability scanning, penetration testing and security policy review.',
        'Custom analytics dashboard development with real-time data integration and business intelligence features.',
        'Integration of e-commerce platform with existing systems including inventory, CRM and accounting software.',
        'Comprehensive training program for staff on new software systems and security awareness.',
        'Custom development and modification of CRM system to meet specific business requirements.',
        'Annual maintenance contract for network infrastructure including emergency support and regular health checks.',
        'Implementation of workflow automation for key business processes to improve efficiency and reduce manual work.',
        'Strategic consulting services for data analytics implementation and business intelligence strategy.',
        'Development of comprehensive cloud migration roadmap and implementation strategy.',
        'Implementation of security controls and procedures to ensure compliance with industry regulations.',
        'Development of comprehensive disaster recovery and business continuity plans with testing procedures.',
        'Development of RESTful APIs for system integration and third-party connectivity.',
        'Supply of enterprise-grade hardware including workstations, servers and networking equipment.',
    ];

    const getRandomDescription = () => {
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    };

    const dealsArray = Array.from({ length: 200 }, () => {
        const createdAt = getRandomDate(startDate, endDate);
        return {
            title: getRandomTitle(),
            description: getRandomDescription(),
            value: parseFloat((Math.random() * 50000 + 5000).toFixed(2)),
            status: getRandomStatus(),
            customer_id: getRandomCustomer().id,
            created_at: createdAt,
            updated_at: createdAt,
        };
    });

    await knex('deals').insert(dealsArray);
}
