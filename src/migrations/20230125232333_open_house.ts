import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('open_house', function (table) {
        table.increments('id').primary();
        table.integer('visitor_amount').notNullable();
        table.integer('property_id').unsigned();
        table.foreign('property_id').references('id').inTable('property').onUpdate('CASCADE').onDelete('CASCADE');
        table.dateTime('start_date').notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('open_house')
}