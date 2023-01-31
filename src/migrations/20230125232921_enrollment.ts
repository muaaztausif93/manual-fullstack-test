import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('enrollment', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned();
        table.foreign('user_id').references('id').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('open_house_id').unsigned();
        table.foreign('open_house_id').references('id').inTable('open_house').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('enrollment');
}

