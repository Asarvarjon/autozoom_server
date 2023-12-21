import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    ALTER TABLE cars
        ADD COLUMN price_in_aed_sale varchar,
        ADD COLUMN price_in_usd_sale varchar;
`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table cars;
    `);  
}

