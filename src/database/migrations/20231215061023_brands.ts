import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists brands (
        id uuid primary key default uuid_generate_v4(),
        image_src varchar(1024) not null,
        title varchar(255) not null,
        created_at timestamp not null default current_timestamp
    );
`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table brands;
    `);  
}

