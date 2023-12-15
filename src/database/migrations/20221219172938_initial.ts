import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

await knex.schema.raw(`
    create extension if not exists "uuid-ossp";
`); 

await knex.schema.raw(`
    CREATE TYPE gender_enum AS ENUM ('f', 'm'); 
`); 

await knex.schema.raw(`
    CREATE TYPE product_status AS ENUM ('free', 'busy'); 
`); 


await knex.raw(`
    create table if not exists users(
        user_id uuid primary key default uuid_generate_v4(),
        first_name varchar(32) not null,
        last_name varchar(32),  
        phone_number varchar(12) not null, 
        password varchar(128) not null,
        created_at timestamp not null default current_timestamp,
        updated_at timestamp not null default current_timestamp
);
`);  

await knex.raw(`
    create table if not exists user_sessions (
        id uuid primary key default uuid_generate_v4(),
        user_id uuid references users (user_id) on delete cascade not null,
        refresh_token character varying(1024) not null,
        refresh_token_expires_at timestamp with time zone not null,
        logged_in_at timestamp with time zone not null default current_timestamp,
        logged_out_at timestamp with time zone,
        is_logged_out boolean not null default false,
        remote_ip character varying(36) not null,
        device text not null
    );
`);  


await knex.raw(`
    create table if not exists images (
        id uuid primary key default uuid_generate_v4(),
        name varchar(1024) not null,
        src varchar(64) not null,
        size bigint not null,
        ext varchar(6) not null,
        mimetype varchar(16) not null
    );
`)

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table users;
    `);  

    await knex.raw(`
        drop table user_sessions;
    `);

    await knex.raw(`
        drop table images;
`);
}

