import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists cars (
        id uuid primary key default uuid_generate_v4(),
        brand_id uuid references brands (id) not null,  
        model_id uuid references models (id) not null,  
        city_id uuid references cities (id) not null,  
        color varchar(256),
        year varchar(4) not null,
        seconds varchar not null,
        max_speed varchar not null,
        max_people int not null,
        transmission varchar not null,
        motor varchar not null,
        drive_side varchar not null,
        petrol varchar not null,
        limitperday int not null,
        deposit int not null,
        premium_protection int not null,
        price_in_aed varchar not null,
        price_in_usd varchar not null,
        location_id uuid references locations (id) not null, 
        category_id uuid references categories (id) not null,  
        created_at timestamp not null default current_timestamp
    );
`)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table cars;
    `);  
}

