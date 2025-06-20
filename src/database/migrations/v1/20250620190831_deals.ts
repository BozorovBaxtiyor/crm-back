import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('deals', table => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.text('description');
        table.decimal('value', 10, 2);
        table.string('status', 20).defaultTo('new');
        table.integer('customer_id').references('id').inTable('customers').onDelete('SET NULL');
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('deals');
}
