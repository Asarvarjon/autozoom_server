import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    ALTER TABLE cars
        ADD COLUMN inclusive boolean default false;
`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table cars;
    `);  
}

