import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('customers').del();

    // Get user IDs for foreign key references
    const users = await knex('users').select('id').where('role', 'user');

    if (users.length === 0) {
        throw new Error('No users found in the database. Please run the users seed first.');
    }

    const getRandomUserId = () => {
        return users[Math.floor(Math.random() * users.length)].id;
    };

    const getRandomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6); // Going back 6 months

    // Sample company domains
    const companyDomains = [
        'artel.uz',
        'uztelecom.uz',
        'kapitalbank.uz',
        'uzum.uz',
        'olx.uz',
        'click.uz',
        'agro.uz',
        'texnomart.uz',
        'davr-bank.uz',
        'promstroy.uz',
    ];

    // Create array of customers with realistic Uzbek companies
    const customers = [
        {
            name: 'Alisher Kholmatov',
            email: 'a.kholmatov@artel.uz',
            phone: '+998901234567',
            company: 'Artel Electronics',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Dildora Rakhimova',
            email: 'dildora@uztelecom.uz',
            phone: '+998977654321',
            company: 'Uztelecom',
            status: 'active',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Farhod Mirzayev',
            email: 'f.mirzayev@kapitalbank.uz',
            phone: '+998933456789',
            company: 'Kapitalbank',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Nigora Safarova',
            email: 'nigora@uzum.uz',
            phone: '+998909876543',
            company: 'Uzum Market',
            status: 'potential',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Otabek Yusupov',
            email: 'otabek.y@olx.uz',
            phone: '+998946543210',
            company: 'OLX Uzbekistan',
            status: 'waiting',
            value: 'Low',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Barno Usmanova',
            email: 'barno@click.uz',
            phone: '+998935678901',
            company: 'Click',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Davron Karimov',
            email: 'davron.karimov@agro.uz',
            phone: '+998998761234',
            company: 'Uzbekistan Agriculture',
            status: 'potential',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Shoira Mahmudova',
            email: 's.mahmudova@texnomart.uz',
            phone: '+998912345678',
            company: 'Texnomart',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Akbar Ruzmetov',
            email: 'a.ruzmetov@davr-bank.uz',
            phone: '+998945432109',
            company: 'Davr Bank',
            status: 'waiting',
            value: 'Low',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Shakhzoda Abdullaeva',
            email: 'shakhzoda@promstroy.uz',
            phone: '+998976543210',
            company: 'Promstroy Group',
            status: 'potential',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Bekzod Ismoilov',
            email: 'bekzod@asiapharma.uz',
            phone: '+998903216549',
            company: 'Asia Pharma',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Gulnoza Kamalova',
            email: 'g.kamalova@orient-finance.uz',
            phone: '+998998765432',
            company: 'Orient Finance Bank',
            status: 'potential',
            value: 'Low',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Jahongir Tursunov',
            email: 'j.tursunov@sarkor.uz',
            phone: '+998951234567',
            company: 'Sarkor Telecom',
            status: 'active',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Madina Ergasheva',
            email: 'madina.e@agrokimyo.uz',
            phone: '+998912345678',
            company: 'Agrokimyo Protect',
            status: 'waiting',
            value: 'Low',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Firuz Abdurahmonov',
            email: 'firuz@agrobank.uz',
            phone: '+998987654321',
            company: 'Agrobank',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Nilufar Sharipova',
            email: 'nilufar@avtoraqam.uz',
            phone: '+998909876543',
            company: 'Avtoraqam',
            status: 'potential',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Ulugbek Eshmatov',
            email: 'ulugbek@myday.uz',
            phone: '+998935678901',
            company: 'MyDay Media',
            status: 'active',
            value: 'Low',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Zarina Khakimova',
            email: 'zarina.kh@uzbekistan-airways.uz',
            phone: '+998998765432',
            company: 'Uzbekistan Airways',
            status: 'waiting',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Iskandar Jalilov',
            email: 'iskandar@datasite.uz',
            phone: '+998712345678',
            company: 'DataSite Solutions',
            status: 'potential',
            value: 'Medium',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
        {
            name: 'Lola Yuldasheva',
            email: 'lola@hamkorbank.uz',
            phone: '+998909876543',
            company: 'Hamkorbank',
            status: 'active',
            value: 'High',
            user_id: getRandomUserId(),
            created_at: getRandomDate(startDate, endDate),
        },
    ];

    // Add updated_at field to match created_at
    const customersWithUpdates = customers.map(customer => ({
        ...customer,
        updated_at: customer.created_at,
    }));

    // Insert customers
    await knex('customers').insert(customersWithUpdates);
}
