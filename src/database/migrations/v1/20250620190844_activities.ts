import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('activities', table => {
        table.increments('id').primary();
        table.string('type', 50).notNullable();
        table.text('description').notNullable();
        table.integer('customer_id').references('id').inTable('customers').onDelete('SET NULL');
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('activities');
}
