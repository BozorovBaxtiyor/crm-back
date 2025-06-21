import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deleting existing entries
    await knex('users').del();

    const saltRounds = 10;
    const currentDate = new Date();

    // Create one admin user
    const adminUser = {
        email: 'example@gmail.com',
        password_hash: await bcrypt.hash('StrongPassword', saltRounds),
        name: 'Rustam Karimov',
        role: 'admin',
        created_at: currentDate,
        updated_at: currentDate,
    };

    // Create 20 regular users with realistic Uzbek names
    const regularUsers = [
        {
            email: 'akmal.rahimov@example.com',
            name: 'Akmal Rahimov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'dilshod.usmanov@example.com',
            name: 'Dilshod Usmanov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'feruza.mirzoeva@example.com',
            name: 'Feruza Mirzoeva',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'gulnora.iskandarova@example.com',
            name: 'Gulnora Iskandarova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'jasur.alibekov@example.com',
            name: 'Jasur Alibekov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'kamola.ibragimova@example.com',
            name: 'Kamola Ibragimova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'laziz.yusupov@example.com',
            name: 'Laziz Yusupov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'malika.azimova@example.com',
            name: 'Malika Azimova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'nodir.tursunov@example.com',
            name: 'Nodir Tursunov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'odina.karimova@example.com',
            name: 'Odina Karimova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'pulat.sharipov@example.com',
            name: 'Pulat Sharipov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'qodirjon.rakhimov@example.com',
            name: 'Qodirjon Rakhimov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'ravshan.mahmudov@example.com',
            name: 'Ravshan Mahmudov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'sitora.saidova@example.com',
            name: 'Sitora Saidova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'timur.aliyev@example.com',
            name: 'Timur Aliyev',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'umida.khasanova@example.com',
            name: 'Umida Khasanova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'vali.berdiyev@example.com',
            name: 'Vali Berdiyev',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'xurshida.nabiyeva@example.com',
            name: 'Xurshida Nabiyeva',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'yusuf.sodikov@example.com',
            name: 'Yusuf Sodikov',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
        {
            email: 'zarina.khamidova@example.com',
            name: 'Zarina Khamidova',
            password_hash: await bcrypt.hash('user123', saltRounds),
            role: 'user',
            created_at: new Date(
                currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
            ),
        },
    ];

    // Add updated_at field to each user
    const usersWithUpdatedAt = regularUsers.map(user => ({
        ...user,
        updated_at: user.created_at,
    }));

    // Insert admin user
    await knex('users').insert(adminUser);

    // Insert regular users
    await knex('users').insert(usersWithUpdatedAt);
}
