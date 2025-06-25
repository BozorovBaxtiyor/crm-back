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
    await knex('users').insert(adminUser);

}
