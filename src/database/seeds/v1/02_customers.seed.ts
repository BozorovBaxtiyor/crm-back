import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('customers').del();

    const getRandomDate = (start: Date, end: Date): Date => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3); // Oxirgi 3 oy ichida

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
        'asiapharma.uz',
        'orient-finance.uz',
        'sarkor.uz',
        'agrokimyo.uz',
        'agrobank.uz',
        'avtoraqam.uz',
        'myday.uz',
        'uzbekistan-airways.uz',
        'datasite.uz',
        'hamkorbank.uz',
    ];

    const getRandomCompany = () => {
        return companyDomains[Math.floor(Math.random() * companyDomains.length)];
    };

    const names = [
        'Alisher Kholmatov',
        'Dildora Rakhimova',
        'Farrux Yusupov',
        'Laylo Akbarova',
        'Sardor Ergashev',
        'Kamola Xusanova',
        'Javlonbek Karimov',
        'Malika Ibragimova',
        'Sherzod Umarov',
        'Zarnigor Raxmatova',
        'Akmal Tursunov',
        'Madina Rasulova',
        'Shahzodbek Nurmatov',
        'Gulnoza Tadjieva',
        'Murod Karimov',
        'Nodira Xolmatova',
        'Anvar Bekchanov',
        'Dilrabo Toshpulatova',
        'Rustam Xasanov',
        'Ziyoda Mamatqulova',
    ];

    const statuses = ['active', 'potential', 'waiting'];
    const values = ['High', 'Medium', 'Low'];

    const getRandomPhone = () => {
        const code = Math.floor(900 + Math.random() * 100); // 900 - 999
        const num = Math.floor(1000000 + Math.random() * 9000000);
        return `+998${code}${num}`;
    };

    const getEmailFromNameAndDomain = (fullName: string, domain: string) => {
        const [firstName, lastName] = fullName.toLowerCase().split(' ');
        return `${firstName}.${lastName}${Math.floor(Math.random() * 100)}@${domain}`;
    };

    const customers = Array.from({ length: 50 }, () => {
        const name = names[Math.floor(Math.random() * names.length)];
        const company = getRandomCompany();
        const created_at = getRandomDate(startDate, endDate);

        return {
            name,
            email: getEmailFromNameAndDomain(name, company),
            phone: getRandomPhone(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            value: values[Math.floor(Math.random() * values.length)],
            company: company, // typo intentionally preserved from your code
            created_at,
            updated_at: created_at,
        };
    });

    await knex('customers').insert(customers);
}
