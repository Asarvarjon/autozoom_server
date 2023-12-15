import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
 
    await knex.raw(`
    create table if not exists news (
        id uuid primary key default uuid_generate_v4(), 
        image_src varchar, 
        title_ru text, 
        title_en text, 
        title_uz text not null, 
        text_ru text, 
        text_en text, 
        text_uz text not null, 
        created_at timestamp not null default current_timestamp
    );
`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table news;
    `);  
}

