import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists models (
        id uuid primary key default uuid_generate_v4(),
        brand_id uuid references brands(id) not null,
        name varchar(1024) not null,    
        slug varchar(1024) not null,    
        created_at timestamp not null default current_timestamp
    );
`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table models;
    `);  
}

