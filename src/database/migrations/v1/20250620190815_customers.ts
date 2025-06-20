import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('customers', table => {
        table.increments('id').primary();
        table.string('name', 255).notNullable();
        table.string('email', 255).unique().notNullable();
        table.string('phone', 50);
        table.string('company', 255);
        table.string('status', 20).defaultTo('potential');
        table.string('value', 50);
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('customers');
}
