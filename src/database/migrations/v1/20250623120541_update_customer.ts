import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('customers', table => {
        table.dropColumn('user_id');
    });
    await knex.schema.alterTable('deals', table => {
        table.dropColumn('user_id');
    });
    await knex.schema.alterTable('activities', table => {
        table.dropColumn('user_id');
    });
   
}

export async function down(knex: Knex): Promise<void> {
    
    await knex.schema.alterTable('customers', table => {
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    });
    await knex.schema.alterTable('deals', table => {
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    });
    await knex.schema.alterTable('activities', table => {
        table.integer('user_id').references('id').inTable('users').onDelete('SET NULL');
    });
}
