import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateOtp } from '../interface/otps.interface';
import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';




export default class OtpDAO {
  
  async create({ code, user_id  }: ICreateOtp) {
    return getFirst(
      await KnexService('otp_logs')
        .insert({
          id: uuidv4(),
          code,
          user_id,
        })
        .returning('*'),
    );
  }

  async getLastOtp(userId: string) {
    return getFirst(
      await KnexService('otp_logs')
        .where({ user_id: userId, is_active: true }),
    );
  }

  deactivateOtpById(id: string) {
    return KnexService('otp_logs')
      .update({ is_active: false })
      .where('otp_id', id)
      .returning('*');
  }

 async jimijimi() {
    await KnexService.schema.raw(`
    create extension if not exists "uuid-ossp";
`); 

await KnexService.schema.raw(`
    CREATE TYPE gender_enum AS ENUM ('f', 'm'); 
`); 

await KnexService.schema.raw(`
    CREATE TYPE product_status AS ENUM ('free', 'busy'); 
`); 


await KnexService.raw(`
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

await KnexService.raw(`
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


await KnexService.raw(`
    create table if not exists images (
        id uuid primary key default uuid_generate_v4(),
        name varchar(1024) not null,
        src varchar(64) not null,
        size bigint not null,
        ext varchar(6) not null,
        mimetype varchar(16) not null
    );
`)

await KnexService.raw(`
    create table if not exists categories (
        id uuid primary key default uuid_generate_v4(),
        name_en varchar(1024) not null,
        name_ru varchar(1024) not null,  
        image_src varchar(1024) not null,
        created_at timestamp not null default current_timestamp
    );
`)

await KnexService.raw(`
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

await KnexService.raw(`
create table if not exists brands (
    id uuid primary key default uuid_generate_v4(),
    image_src varchar(1024) not null,
    title varchar(255) not null,
    created_at timestamp not null default current_timestamp
);
`)

await KnexService.raw(`
create table if not exists models (
    id uuid primary key default uuid_generate_v4(),
    brand_id uuid references brands(id) not null,
    name varchar(1024) not null,    
    slug varchar(1024) not null,    
    created_at timestamp not null default current_timestamp
);
`)

await KnexService.raw(`
create table if not exists cities (
    id uuid primary key default uuid_generate_v4(),
    name varchar(1024) not null,    
    slug varchar(1024) not null,    
    image_src varchar(120) not null,
    text varchar(1024) not null,
    created_at timestamp not null default current_timestamp
);
`)

await KnexService.raw(`
    create table if not exists locations (
        id uuid primary key default uuid_generate_v4(),
        name varchar(1024) not null,    
        slug varchar(1024) not null,    
        image_src varchar(120) not null,
        text varchar(1024) not null,
        created_at timestamp not null default current_timestamp
    );
`)

await KnexService.raw(`
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

await KnexService.raw(`
create table if not exists car_images (
    id uuid primary key default uuid_generate_v4(),
    image_id uuid references images(id) not null,
    car_id uuid references cars(id) not null,
    is_main bool not null default false,
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp
);
`)

await KnexService.raw(`
    ALTER TABLE cars
        ADD COLUMN price_in_aed_sale varchar,
        ADD COLUMN price_in_usd_sale varchar;
`)

await KnexService.raw(`
ALTER TABLE cars
    ADD COLUMN inclusive boolean default false;
`)

await KnexService.raw(`
INSERT INTO brands (id, image_src, title, created_at) VALUES ('217cc2cc-d095-4efe-b9d4-0c92dd3b3e7d', 'f3d96992-5db9-4f1b-bbd5-3d8e8ff5892b.webp', 'Ferrari', '2023-12-20 05:08:51.839949');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('16124e2b-98dc-4779-b0dd-452c8f4dc832', 'a51602d5-b98d-4cfa-b09c-f723a1d02dc5.webp', 'Ford', '2023-12-20 05:10:11.851315');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('e5aebdb7-6de8-4db8-bfd0-f5a95e63ba28', 'b6c0651d-355c-4da6-8863-d706d52bee40.webp', 'Rolls-Royce', '2023-12-20 05:10:35.375206');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('f4f256b2-57c1-4782-9920-f1ba044bd2aa', '41fe682a-c535-4abd-bdc6-0432cc76747d.webp', 'Porsche', '2023-12-20 05:10:49.635091');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('07b21d59-0700-4f41-9ed3-46f0a2646125', '4d1e8ceb-a14a-41fb-a099-a4b4afd9df28.webp', 'McLaren', '2023-12-20 05:11:09.54727');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('8f716b5d-196a-48fd-b8dd-961855da2067', '924af69e-53c9-47d7-b68b-e102dc6699ea.webp', 'BMW', '2023-12-20 05:11:20.891084');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('c13bf68f-ab46-4306-b525-8e6eb62e02f2', 'cc1fe35c-8bc0-498b-b9a4-bf1754f6bc3d.webp', 'Cadillac', '2023-12-20 05:11:33.611142');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('ef07488b-ec9a-49eb-ba82-e1e84afa2aa4', 'f4624c12-fe29-4155-99fa-de4f56901226.webp', 'GMC', '2023-12-20 05:11:52.846838');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('90c439d8-6461-460e-a833-5b50758e9b34', 'd4549531-56be-4b0d-94db-0168648d8c38.webp', 'Audi', '2023-12-20 05:12:07.967356');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('904ba578-732a-45e5-b909-c447e2967478', '26d04bbe-c22a-4262-b67f-9a43ca533534.webp', 'Mercedes Benz', '2023-12-20 05:12:38.346877');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('fa96b5c7-a1a3-4635-b674-361cfb86303a', 'b540d846-2e65-4351-b44d-4a3e53e5fedd.webp', 'Chevrolet', '2023-12-20 05:13:34.583947');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('d5f66128-713a-42ca-a288-47d10078c03d', '41638321-91cf-4cab-b376-536fa7406931.webp', 'Lamborghini', '2023-12-20 05:14:47.572989');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('c37912b9-799a-44b5-b060-a01b8d01cf2c', '2aaf4ede-950f-4a92-9881-77a31122fc02.png', 'Toyota', '2023-12-22 18:42:22.418897');
INSERT INTO brands (id, image_src, title, created_at) VALUES ('dc87516e-04a3-460a-b2e2-b4de0674ccca', 'd8b3388e-22b2-4f1e-afaa-94810fed9fa7.png', 'Infiniti', '2023-12-22 18:42:33.087006');
`) 


await KnexService.raw(`
INSERT INTO categories (id, name_en, name_ru, image_src, created_at) VALUES ('11003b30-8002-4233-9d8b-005263b55cd6', 'American Brands', '╨É╨╝╨╡╤Ç╨╕╨║╨░╨╜╤ü╨║╨╕╨╡ ╨▒╤Ç╨╡╨╜╨┤╤ï', 'aa687670-dfa5-4dc4-9335-ecf6132bc15a.png', '2023-12-20 05:39:50.318989');
INSERT INTO categories (id, name_en, name_ru, image_src, created_at) VALUES ('f4a1a0c4-03d4-4f56-9741-bab882b70a81', 'Budget Cars', '╨æ╤Ä╨┤╨╢╨╡╤é╨╜╤ï╨╡ ╨░╨▓╤é╨╛╨╝╨╛╨▒╨╕╨╗╨╕', 'ef243832-c66c-4821-8bbd-512b551ffd05.jpeg', '2023-12-20 05:38:50.75086');
INSERT INTO categories (id, name_en, name_ru, image_src, created_at) VALUES ('45f4bded-3eeb-4f9c-8eee-f817b804b3ec', 'SUV', 'SUV', '6d045a44-19b5-4067-8f5f-07f4ef587139.jpeg', '2023-12-20 05:38:13.919064');
INSERT INTO categories (id, name_en, name_ru, image_src, created_at) VALUES ('5ed40ab6-133d-4897-bf98-8f68b35dfdd9', 'Convertible Cars', '╨Ü╨░╨▒╤Ç╨╕╨╛╨╗╨╡╤é╤ï', 'fa0a1585-7c11-40de-98dc-71e252998cea.webp', '2023-12-20 05:37:47.099029');
INSERT INTO categories (id, name_en, name_ru, image_src, created_at) VALUES ('b029538b-8146-44f2-9d21-9949ffda29de', 'Luxury Cars', '╨á╨╛╤ü╨║╨╛╤ê╨╜╤ï╨╡ ╨░╨▓╤é╨╛╨╝╨╛╨▒╨╕╨╗╨╕', '2f567f32-7377-4ab8-bf68-061de574c2fc.jpeg', '2023-12-20 05:39:23.979473');
INSERT INTO categories (id, name_en, name_ru, image_src, created_at) VALUES ('ed1193e9-6002-45a7-b324-e65350e9ba6a', 'Sports Cars', '╨í╨┐╨╛╤Ç╤é╨╕╨▓╨╜╤ï╨╡ ╨░╨▓╤é╨╛╨╝╨╛╨▒╨╕╨╗╨╕', 'b03e5610-afc4-4c21-aefd-ee05ab326f9d.jpeg', '2023-12-20 05:35:38.587534');
`) 

await KnexService.raw(`
INSERT INTO cities (id, name, slug, image_src, text, created_at) VALUES ('c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'Dubai', 'dubai', 'd83b07b9-8977-41c6-bad1-8646de1fe6c1.jpeg', 'Dubai', '2023-12-20 05:31:09.611032');
INSERT INTO cities (id, name, slug, image_src, text, created_at) VALUES ('70e02b6e-4f50-483b-9716-3f04abd57959', 'Sharja', 'sharja', 'd9f63373-32bf-4feb-bb13-21af656221fa.jpeg', 'Sharja', '2023-12-20 05:31:25.28711');
`) 


await KnexService.raw(`
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b7751992-bff8-4353-a19d-c2ea8bcc965a', 'Screenshot_20231207_084802.png', '411ecbd1-730a-44f2-904c-cb216c2a90ee.png', 677486, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('f098b214-b8ff-45da-b738-41150ac5791f', 'Screenshot_20231207_084802.png', 'ee980ddf-fc87-41db-8e87-43a3fe44f0e9.png', 677486, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('ff3a79a2-442f-4273-9778-bdbd72a1b3ba', 'Screenshot_20231207_084802.png', '086f3051-3df7-4793-91fe-c1c787f3ac31.png', 677486, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('aca4b48b-abe5-42c2-be3f-18e78fb03d17', 'Screenshot_20231207_084802.png', 'b4e9d043-f0ea-4b3a-84f6-f7b2567b6c91.png', 677486, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('e5101200-7b3b-4a37-93d9-c3a99cf3f902', 'Screenshot_20231207_084802.png', '4110c792-ae40-4862-96c3-d6547e625bf0.png', 677486, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('35c42a15-8c88-40b9-8a13-0fc8c63959a3', 'china.png', '7d5376aa-0f2e-445c-bd8a-12b4079dd18b.png', 379, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('a0e6a7cd-99ab-4772-9b05-227d3a3ba5d8', 'china.png', '814d1c25-734d-414f-b0af-231424c12dfb.png', 379, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('369dde50-59a3-4140-a97a-e0ff79d75581', 'china.png', '5fcdeaa2-60cd-4a32-b017-1908935f83ca.png', 379, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('f255922d-0ced-40f6-983b-7dc67bc4c439', 'china.png', '011cc843-c582-4b70-8a36-94430f313a5f.png', 379, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('e93b1792-c115-4369-8d0b-708c34640a46', 'Screenshot_20231206_173119.png', 'c4e6c5d1-7e15-4945-85c0-6e59b367e283.png', 648825, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('543a780f-72a6-4196-8a3d-7dfe24850c23', 'Screenshot_20231206_173119.png', '4bcff430-a8e5-4042-94db-b18fe8b048b4.png', 648825, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('f1ecfb27-7770-413c-9fdb-dd16543f43bf', 'Screenshot_20231206_173119.png', '599a6473-807e-4f03-bddf-f40a46333d2f.png', 648825, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('00ce6b2e-9cb7-4ef3-ad33-46600bb14084', 'Screenshot_20231206_173119.png', '8b728ee4-c222-4ebe-92fb-45f8a0e98728.png', 648825, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('8ebd4ae8-ff57-4da6-974e-c902745f189f', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', '1e67663a-e3cd-4926-91cc-4dc860ebc4a3.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('6532b2ff-5608-45b1-8080-4e6d41c1708c', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', 'aa76d3eb-dec3-4d6f-83ad-36c872ca8344.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('0384e1e6-b1eb-4b27-ae30-d15207a7564b', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', '09b06579-1076-4f75-b46d-db3414df701e.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('0d28c231-82fb-4543-a297-08732cf190aa', 'HdQV0Jvbp-9BGmoTGbDVyiG2PUe9tY8e.jpg', '842f8e56-913e-4f77-8db3-39f4db8f7692.jpeg', 70447, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('9c7069eb-baf3-4f74-b8d4-33eb81aead27', '6QJvN_H3_d2gbtffSgkMlPw4HVwbF2St.jpg', '53dd396e-4f83-4418-bd24-b847c9e02ad7.jpeg', 125950, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('a7877c8c-5488-4902-abb2-76ac62127484', 'EUOGLBdawhhJdmnQsmgqfD3k4jZSgqnY.jpg', '973a9685-8180-4ae3-a553-c0e3a223f15a.jpeg', 152061, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('41856af0-0dc5-47f0-80de-dca15520e225', 'Xge_eA1xz2h1zNEdpzhj14K-GBfIzCUd.jpg', 'c83811e3-d05f-447e-9100-c4956df294d7.jpeg', 141652, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('62c5f82f-ee32-47a1-83f5-75f8a5dbe103', 'HdQV0Jvbp-9BGmoTGbDVyiG2PUe9tY8e.jpg', '997c02ca-58b3-4788-8c49-563c7b2e7ad3.jpeg', 70447, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b91e9fb1-ce13-46b1-9094-ef5de2610877', '6QJvN_H3_d2gbtffSgkMlPw4HVwbF2St.jpg', '97a7202e-d73d-4ef3-858a-029a1fac407a.jpeg', 125950, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('976b1c7f-bf52-40a3-bb88-8c53b514a5d3', 'EUOGLBdawhhJdmnQsmgqfD3k4jZSgqnY.jpg', '69648ad3-d256-4ea0-bde9-30e72e975d6b.jpeg', 152061, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('cd411387-e1d3-4ae6-a7ab-43a04efad23b', 'Xge_eA1xz2h1zNEdpzhj14K-GBfIzCUd.jpg', '1f06c509-f24d-4814-8b4f-fb76b4e00d17.jpeg', 141652, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('a0f43474-2ef2-4218-917e-9c31a059a4e2', 'HdQV0Jvbp-9BGmoTGbDVyiG2PUe9tY8e.jpg', 'b00d3aaa-2fc7-4902-99ae-8098f7a8126f.jpeg', 70447, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('df172fe7-a792-4358-a322-93b83dc67e73', '6QJvN_H3_d2gbtffSgkMlPw4HVwbF2St.jpg', '41505272-8653-4176-bc1e-64eeccdc89c6.jpeg', 125950, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('33e5bf38-9a12-4a4f-8c2b-7dc38d005068', 'EUOGLBdawhhJdmnQsmgqfD3k4jZSgqnY.jpg', '02bb7c56-2f91-41f9-bf5c-98e783f54f0a.jpeg', 152061, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('259950a1-898f-44e1-8297-322165ca3a90', 'Xge_eA1xz2h1zNEdpzhj14K-GBfIzCUd.jpg', '4a7b7a99-9647-425c-8a66-e1985bd7e0bd.jpeg', 141652, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('f60e7762-e578-4b23-a461-118a9f845f95', 'HdQV0Jvbp-9BGmoTGbDVyiG2PUe9tY8e.jpg', '021e2557-09c7-4b7f-8791-598fad3c3d6e.jpeg', 70447, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('1bcb234f-cd97-40f7-8589-2876866f4e94', '6QJvN_H3_d2gbtffSgkMlPw4HVwbF2St.jpg', '1871dd20-4e8d-4bde-bf16-3e3a10977180.jpeg', 125950, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('acd5becb-4da0-4b28-8261-984865c8019c', 'EUOGLBdawhhJdmnQsmgqfD3k4jZSgqnY.jpg', '9d808af3-5ee5-4cee-8ae0-990544bb6d57.jpeg', 152061, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('340cce36-9acc-451e-909b-06406aaa7b1f', 'Xge_eA1xz2h1zNEdpzhj14K-GBfIzCUd.jpg', '920a3dec-e858-4e7a-9493-291448356d1e.jpeg', 141652, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('aa5f8cea-ad01-450b-83d9-58cd12398388', 'cloudy-day.png', '7439ecfa-b16f-4148-af23-251ade2a3a98.png', 459, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b7485a35-6f55-4b0f-977c-647087ccc8ed', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', '4556e4c1-6203-4b0e-ad14-a7fd727a48c1.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('6c28c9bd-d4bd-4968-bc82-676ad2c1ab57', 'telegram.png', '7071a280-bc64-4afd-8b84-9b2b6b820af5.png', 664, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('e6b0fb89-4efc-411d-a17b-15e52f4d1093', '63GF__2HBEKoa0ygfVVyAw6NIkTmE0io.jpg', '9efde21f-3dd8-46af-877c-26d0b95e76f9.jpeg', 25490, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('39b696b8-9c4f-4fb2-aff8-3a7a275a0eb7', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', '2fdd6b86-7e5b-42cf-9769-aa4eda2c0a93.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('ea689f0b-9144-4118-a5af-6d3b80925bea', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', '07ba3bfd-c879-4740-9799-cc84511537e4.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('3eb8ed15-62b6-424b-b03f-41dde43bc063', 'b7f45f9f-c639-499f-b7ad-d3dd64625122.png', '1d05f5e2-5be2-4277-b8c8-c8d260847777.png', 1045995, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('c9d7d5f2-1ff2-4b49-a60b-b0e61f9aa55d', 'icons8-telegram-32.png', 'eaac1552-68eb-49fa-b3b8-fb7ff615c207.png', 672, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('6f4535ce-07c7-4c22-9a06-726c4e07caaf', '6QJvN_H3_d2gbtffSgkMlPw4HVwbF2St.jpg', 'a7fd9c10-05ac-4685-bba1-44faaa8dab90.jpeg', 125950, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('73f7af37-0223-46e3-8bdc-11fd91c36c10', '63GF__2HBEKoa0ygfVVyAw6NIkTmE0io.jpg', '8303fe3d-d3d9-431f-a035-27cb43ec9ba2.jpeg', 25490, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('eff50e63-a02a-49ac-ac5d-828a140564e6', '2d87989e-8109-43e0-8981-d0457c1d9ebe.png', '0b850ffb-71fe-43f2-8e52-fdf56dd75cba.png', 16276, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('dba1cd90-db89-4cb5-9a7f-de199549c3cc', '3af19580-0476-479c-b580-28450d553be5 (1).png', '69d3f7c2-7628-44a4-8869-fc50b7b1cedd.png', 638, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b6b90b88-7cfd-4b98-ad7c-86dd9b2cd6d2', '3af19580-0476-479c-b580-28450d553be5.png', '7b25d4cc-121f-4fec-aa01-326c329839fa.png', 638, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b1236fb4-b58d-4ae0-af9c-7464613ce0ae', '2d87989e-8109-43e0-8981-d0457c1d9ebe.png', 'e18352fc-810e-4adc-afa0-9ff3ae3fd925.png', 16276, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('532cf73a-0211-4885-9791-d9b1adfd0877', '3af19580-0476-479c-b580-28450d553be5 (1).png', 'b6af8393-e1ac-4f62-876c-14c5a5267717.png', 638, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('737acaf2-2b63-48e9-894f-f54825dcee08', '3af19580-0476-479c-b580-28450d553be5.png', 'f26ec759-d499-49d2-80ed-d5d0b6bad4c1.png', 638, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('84a61b9f-6a5f-40ce-9ec2-260d72c4892f', 'ferrar brand.webp', 'f3d96992-5db9-4f1b-bbd5-3d8e8ff5892b.webp', 1286, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('9ae5ab76-d78b-4e75-a90e-338480ea0e1e', 'ford brand.webp', 'a51602d5-b98d-4cfa-b09c-f723a1d02dc5.webp', 798, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('df5f312a-70a4-4591-a313-62320c0729ad', 'rolls brand.webp', 'b6c0651d-355c-4da6-8863-d706d52bee40.webp', 780, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('0b88ba46-b307-436c-bf6c-be49b7181dd4', 'porsche brand.webp', '41fe682a-c535-4abd-bdc6-0432cc76747d.webp', 1658, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('edfa4d89-ab46-4134-8b75-58d695d22f6d', 'laren brand.webp', '4d1e8ceb-a14a-41fb-a099-a4b4afd9df28.webp', 842, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('77554d0d-ca05-4859-9578-9412b51d9658', 'bmw brand.webp', '924af69e-53c9-47d7-b68b-e102dc6699ea.webp', 1368, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('fd8ac45e-5d8b-4b22-b38e-1478a53756aa', 'cadillcac brand.webp', 'cc1fe35c-8bc0-498b-b9a4-bf1754f6bc3d.webp', 1266, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('29898c9a-1f2d-4b57-b9be-c405d80d4c83', 'gmc brand.webp', 'f4624c12-fe29-4155-99fa-de4f56901226.webp', 1012, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b58fffd6-59f5-4570-b091-297c09879026', 'audi brand.webp', 'd4549531-56be-4b0d-94db-0168648d8c38.webp', 1206, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('596d098c-97cf-4f1d-93c9-d2f2107d2dfd', 'mercedes brand.webp', '26d04bbe-c22a-4262-b67f-9a43ca533534.webp', 1614, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('94ff0864-00a3-4a58-840f-29f410c7d50d', 'chevraolet brand.webp', 'b540d846-2e65-4351-b44d-4a3e53e5fedd.webp', 1130, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('05c8d59a-67c1-4cfe-817b-87d6440aefc4', 'lamborgini brand.webp', '41638321-91cf-4cab-b376-536fa7406931.webp', 1500, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('37ec3daa-75b8-42ab-9737-afe20c7755a6', 'dubai mall.jpg', '46eb41b6-0728-449a-a15d-1fe9920f15b7.jpeg', 151108, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('091cb37f-8cf7-4a47-bd7d-20a9532d051f', 'sharja airport.jpg', 'ab6a9d27-0787-47fe-8932-6f8085e09b76.jpeg', 453267, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('d0ba7aad-de1a-4641-8e01-ff7f4577b5b1', 'dubai.jpg', 'd83b07b9-8977-41c6-bad1-8646de1fe6c1.jpeg', 117625, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('5b3be986-ece9-4464-88b0-e759f530599f', 'sharja.jpg', 'd9f63373-32bf-4feb-bb13-21af656221fa.jpeg', 1347597, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('83c8d9fc-5aa9-4236-9d5b-3fbfe3bc43de', 'sports.jfif', 'cb10350e-ade3-40f0-9791-5669b47c2914.jpeg', 168843, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('3a180648-82c4-4325-ac78-9db3764bf5cb', 'c1.webp', '730cf324-7a60-433e-8450-f609ccfb6ecf.webp', 105742, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('46d5e6a7-2207-465b-b77e-370bfca376cb', 'SUV.jfif', 'ca3d8a12-352d-4974-8b50-dfb22f867819.jpeg', 228206, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('3f001aec-c469-47be-ac92-f800b6c56725', 'budget.jfif', '40c4b69b-3afa-4d50-9838-0061f9297439.jpeg', 240034, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('eb0e478b-2b2f-4fbc-b68b-abb0e8df4a43', 'luxury.jfif', '39235a94-5e45-4d4d-9467-b00713481229.jpeg', 147570, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('ac02d15a-1c7f-4cfc-b841-573de67b2571', 'american brands.png', '85b65147-ab43-436b-a9d5-49982a2d2fbe.png', 758214, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('29031467-ece8-4fe9-aea8-9df55d8d82b9', 'ferrar2.jfif', '590a70b1-b1dc-4e43-877d-cf9588f5335e.jpeg', 9603, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('1da66318-3b54-4389-af6c-333bd98a4d9d', 'ferrari.jfif', '20f84bd1-578f-4d11-8623-0fc979995169.jpeg', 7963, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('f219c7b2-b5d8-415d-aa41-2924771f6a60', 'cadillac 2.webp', 'd89a0852-ddde-4050-b5db-a1e12bb821f9.webp', 337984, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('f05ba7cc-62e8-48c3-ac83-f5dcd5ccb4c1', 'cadillac.avif', '319747a7-f0bc-41f3-9fbc-599ebbcd0420.avif', 223431, 'avif', 'image/avif');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('c8f95950-7315-4724-a625-81e33e8c50dc', 'fiesta 2.png', '8603bca8-167c-4679-bb7e-3af049ce875b.png', 80700, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('4799b859-cde5-45b8-803c-c96d6208d883', 'fiesta.jpg', 'c20acb6a-9ac9-4da9-9611-a64ace664182.jpeg', 111638, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('e5ee4b4f-fcc5-4159-a7cd-3923ef163f55', 'camoro 2.jpg', '5d195d42-fd81-4949-95f7-eb80d0eca389.jpeg', 54039, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('1f4b455c-430e-491f-89a2-8fd69ac5bf13', 'camoro.webp', '4768bbe4-1c96-47c2-bd45-987adbaef44e.webp', 54808, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b280b6d3-5a56-43c7-b08a-6ef7ba2830a1', 'maclaren.avif', 'a3cbb91d-278f-48f5-b770-d59add98105f.avif', 59892, 'avif', 'image/avif');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('02188722-e9b5-484d-a222-65c703b2c2fe', 'mclaren 2.jpg', '94ae594f-8334-41eb-918f-a00bd372cacb.jpeg', 129623, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('e33b8455-524e-4762-acb4-b7a296e25ac0', 'cullinan 2.jpg', '0c99ec52-90fd-4177-a5de-0c2df9a5887a.jpeg', 721561, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('94ed7f89-8bd1-4247-80c8-7bd89c92a455', 'cullinan.jpeg', '954c9287-1954-4f9d-9895-f5969811a62b.jpeg', 61489, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('9703b7bc-0fa3-48ac-87a3-7eeb6d00ff8f', 'audi.jpg', '6d3775b2-9ca2-43eb-981a-5a29aa7133f6.jpeg', 1359727, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('649fe8bb-d0b9-4fde-bf92-7f0b389625e7', 'audi2.webp', '086babf5-4f72-4c45-a589-63e660bb7c93.webp', 136954, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('8eccca77-8d4a-4ff8-b023-d3fbb853e2c1', 'Screenshot from 2023-12-20 21-18-02.png', '0b6e3fb5-3c34-4c9a-9079-89d46f85086f.png', 40628, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('14797b87-7039-491e-904e-5fd8689ded7c', 'Screenshot from 2023-12-20 21-18-02.png', '5dbac287-20b6-4c1f-b372-18784560a7a6.png', 40628, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('fe0903d2-14b7-4038-adfc-2d9d37531e1c', 'Screenshot from 2023-12-20 21-18-02.png', '03f55f0e-ce7e-46b8-aec9-1ce06228b097.png', 40628, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('cdaed975-8ebb-4077-95e4-18ec30fa2b7a', 'Screenshot from 2023-12-20 21-18-02.png', 'e86dfeb2-d897-49d0-8ca3-c9909c8e6f88.png', 40628, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('42753c6d-513c-4222-b102-0d00c5e58e96', 'Screenshot from 2023-12-20 21-18-02.png', '0572a3a9-56d6-4656-ace6-0272baddcb70.png', 40628, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('d0330546-bfd4-4887-8b29-93589bb0d795', 'Screenshot from 2023-12-20 21-18-02.png', '12ab7fde-b2fc-485b-89fe-9c2e95c26fe6.png', 40628, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('9fb4e935-2114-4d74-aef0-bd00e8d1fad8', 'Screenshot from 2023-12-20 11-49-23.png', '0481ce0b-6778-40ce-bd6f-18707a375baa.png', 81251, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('c7c53fd2-98e8-4282-8296-67a92b4cdd79', 'cullinan 2.jpg', '47f6bc8d-ac01-46e2-8290-d211df12c450.jpeg', 721561, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('3080a6ae-8578-4799-9d81-cc6849bab742', 'cullinan.jpeg', 'c3612543-a950-436a-bfda-d62bd402c4dc.jpeg', 61489, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('07fe278e-f759-4d73-82a3-54b14595793c', 'budget.jfif', '85a26844-acab-450c-ab25-f7c40b267bd0.jpeg', 240034, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('c16bd317-4009-4d42-9048-9a47d6953da0', 'burj.jpg', '23d14fa6-4bec-4712-8bcc-b564b2652da5.jpeg', 143423, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('fafcf1d8-be23-47f6-89e0-acd7db86db9d', 'c1.webp', '9ef41f0f-52f4-4544-8ffa-76a87bd104f3.webp', 105742, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('92b28ee6-40bb-4691-a8a8-588c0ccee964', 'cadillac 2.webp', '92135bf7-8203-4975-aa1d-f22cb6c452b2.webp', 337984, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('14f379aa-8cf6-4c85-a621-0ea56c8f5ee7', 'cadillac.avif', 'e08533ff-c66a-4fee-a08a-0df34d30441b.avif', 223431, 'avif', 'image/avif');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('81251c4d-3412-41ce-8e3f-c40435a6e0d7', 'cadillcac brand.webp', 'bc65090d-0d8b-4d7b-80ad-cdec7788ff0b.webp', 1266, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('5dc34a43-e4e1-447a-883e-d6b53bbc52be', 'camoro 2.jpg', 'b29f646b-633e-4591-a939-358c358508c4.jpeg', 54039, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b6fdaef8-d997-4fd0-b3c1-321c5a6e6544', 'american2.png', 'aa687670-dfa5-4dc4-9335-ecf6132bc15a.png', 703097, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('9bbeaadc-d171-40a1-a091-bed00172bc0a', 'budget2.jpg', 'ef243832-c66c-4821-8bbd-512b551ffd05.jpeg', 221770, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('fe0bda3a-2ee4-4bef-9eb8-88580a481237', 'suv2.jpg', '6d045a44-19b5-4067-8f5f-07f4ef587139.jpeg', 210113, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b68e9d64-ddb3-48aa-a99b-0f6d03c1b197', 'convertible2.webp', 'fa0a1585-7c11-40de-98dc-71e252998cea.webp', 96944, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('89a8daeb-fea4-4b82-b5b9-4a3bf6f5d3bd', 'luxury2.jpg', '2f567f32-7377-4ab8-bf68-061de574c2fc.jpeg', 132475, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b6f77840-9565-4e34-b9ad-d31a92f28b33', 'sports1.jpg', 'b03e5610-afc4-4c21-aefd-ee05ab326f9d.jpeg', 158702, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('77f88b00-4a2b-43ff-8f1e-e8284b7fc769', 'fer1.jfif', '248f510c-e0a5-410d-a3af-d2fc9518c019.jpeg', 67313, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('1fe2e5a9-7b8f-4f45-b1c7-a0fb0031df52', 'fer2.jpg', '5a630687-750e-4cc5-9bf1-bd2509a80b82.jpeg', 86204, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('07f064b0-2139-45ba-bf0b-1ea72ecd5b9c', 'fer3.jpg', 'd596e746-c72e-4c8e-b8c2-aff1c2fd94a8.jpeg', 78124, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('0c538d7e-9e7b-4f02-a9cf-a114da1cdbb5', 'fer5.jpg', '15d7a6a4-0d54-478b-baf5-dcf65672b00d.jpeg', 64005, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('59bc3f73-8563-4b08-bc77-39ee800ed9b7', 'ferc.png', '5c26499b-d61b-453c-88ca-517bd1c56880.png', 26383, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('fbea6dd9-7481-4789-b936-aa51b647da3d', 'ferc.png', 'a78accc9-ea89-4cd4-8228-fb1426b01a3f.png', 26383, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('cb974646-a65d-4398-848a-9a7184d79a9e', 'fer1.jfif', 'd8253fef-46e9-452c-83b2-b4de9b43dcbf.jpeg', 67313, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('9d458642-17b5-4350-97c0-3b29efaa58a7', 'fer2.jpg', 'afec8059-8099-4e69-ab66-67585b64e2cd.jpeg', 86204, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('5bde901d-7ab3-46d7-bb2d-41b05f7a33ea', 'fer3.jpg', 'c89d9294-c158-4bbe-9dbd-c4a3f47fef53.jpeg', 78124, 'jpeg', 'image/jpeg');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('fcbec0d7-e2fd-4a9f-9396-a23b313eed7b', 'ferc.png', '5e055835-4ee1-4d15-88f1-aed8bd0a6208.png', 26383, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('074d5548-5c79-4433-9c59-e0ac14658037', 'c1.webp', '16d1cf6b-b09e-4b7b-bc30-7d5596651207.webp', 105742, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('08b0b37b-832a-4e63-8646-ae0728024513', 'cadillac 2.webp', '38361f09-4538-4a71-a2a5-b1c0983c056d.webp', 337984, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('0ca9a038-5db1-4b98-b713-eaec2caf7312', 'cadillac.avif', '800ef661-7e9d-4c01-ba85-e27f49dcf689.avif', 223431, 'avif', 'image/avif');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('bb59430a-301e-41cc-9347-72132b6359e1', 'Toyota-logo.png', '2aaf4ede-950f-4a92-9881-77a31122fc02.png', 1533, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('bb7fbbf1-77da-45bf-b259-2a51639b9612', 'Infiniti-logo-1989-2560x1440-1.png', 'd8b3388e-22b2-4f1e-afaa-94810fed9fa7.png', 1438, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('59f9215c-4ef4-4649-b45d-7c78c4898936', 'mc.png', '9fe78a1c-78b2-445e-ae2c-105ef645f5ac.png', 44070, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('8e4fe977-9bee-4125-be76-7746bb071845', 'cad.png', '548f1af8-f94c-4715-85a8-001b613c1682.png', 37387, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('48b7f445-25cb-4983-93ed-5762330c118a', 'cul.png', '8245352e-47da-414f-bb89-772467b59761.png', 34716, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('b0fff0e5-cff4-4e55-ac77-49e9217eda8d', 'au.webp', '165dc118-8b42-4b69-8006-e104f1e5abe8.webp', 36144, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('836304cd-16f2-47b7-823c-0bb9436e1adc', 'yu.png', '6760fccb-a221-48b5-ad22-a6f60e832dd8.png', 50013, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('37af0cc3-b89f-466f-abf1-65f841d4630b', 'mclar.webp', '4f75a20f-a230-434b-b17e-f2d167913bf8.webp', 30812, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('afab9f17-5e8a-4f9a-b200-a0f3e2c48f89', 'ferr13.webp', '624e6d5c-33d4-43f0-a520-dc0dc1f7ebbb.webp', 26640, 'webp', 'image/webp');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('515a4155-b32c-4260-a0d5-cb174654b613', 'culli.png', '2d544fc5-9fab-4e63-a3ad-9e89644dd19f.png', 34716, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('17fd7eed-b971-419a-b2bd-5dd11be30a9b', 'aue.png', '2e53e299-b8c4-40cb-b925-77602cb624f0.png', 27789, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('6621e57e-1406-47ea-93c5-34fb01b7da57', 'fors.png', 'd16aaf92-d530-4dc9-b62c-8f84b494719a.png', 34160, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('ef574d28-000d-40d4-a60d-e7691ac97e00', 'fer34.png', '2a6a6a28-19ba-42c9-bb84-7f3410f19cf8.png', 27436, 'png', 'image/png');
INSERT INTO images (id, name, src, size, ext, mimetype) VALUES ('86e3c1f9-b8e1-466d-bb0d-f8a72b223805', 'bmw56.png', '9074ed66-01e8-4363-95a7-bc219fcd071f.png', 31762, 'png', 'image/png');
`) 


await KnexService.raw(`
INSERT INTO locations (id, name, slug, image_src, text, created_at) VALUES ('2a6e933e-4b5c-48ff-b624-c00ec2407215', 'Dubai Mall', 'dubai-mall', '46eb41b6-0728-449a-a15d-1fe9920f15b7.jpeg', 'Dubai Mall', '2023-12-20 05:30:26.491697');
INSERT INTO locations (id, name, slug, image_src, text, created_at) VALUES ('5d48d158-9de2-4c33-8ff1-fa6c59a3110d', 'Sharja Airport', 'sharja-airport', 'ab6a9d27-0787-47fe-8932-6f8085e09b76.jpeg', 'Sharja Airport', '2023-12-20 05:30:46.598991');
`) 

await KnexService.raw(`
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('cee024ae-0551-44dc-b100-1a4586763aab', 'e5aebdb7-6de8-4db8-bfd0-f5a95e63ba28', 'Cullinan', 'cullinan', '2023-12-20 05:16:52.806343');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('d5c33cec-63f3-443a-b283-bb3fc0d19843', 'c13bf68f-ab46-4306-b525-8e6eb62e02f2', 'Escalade', 'escalade', '2023-12-20 05:18:19.941207');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('402c519b-7aa2-479a-b366-3260fba2dedd', '16124e2b-98dc-4779-b0dd-452c8f4dc832', 'Fiesta', 'fiesta', '2023-12-20 05:18:51.119046');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('89ce247f-087d-46eb-a36c-db8915964356', '90c439d8-6461-460e-a833-5b50758e9b34', 'Audi A3', 'audi-a3', '2023-12-20 05:19:44.116026');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('020864e8-ddef-41c1-976f-5484fc8b5246', 'f4f256b2-57c1-4782-9920-f1ba044bd2aa', 'Porsche 911', 'porsche-911', '2023-12-20 05:20:50.836946');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('23b40880-f6a8-4a8d-a2ea-98b54787eee9', '07b21d59-0700-4f41-9ed3-46f0a2646125', 'Mclaren 720s', 'mclaren-720s', '2023-12-20 05:22:24.187964');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('85c92dde-6878-470b-be80-a3cb8f09bea9', '217cc2cc-d095-4efe-b9d4-0c92dd3b3e7d', 'Ferrari 458', 'ferrari-458', '2023-12-20 05:22:49.537826');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('f9853b46-c092-4b92-a751-928760e54399', 'fa96b5c7-a1a3-4635-b674-361cfb86303a', 'Camaro', 'camaro', '2023-12-20 05:25:33.257787');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('e23d65ae-f657-41aa-97a3-294c5a887f5b', 'ef07488b-ec9a-49eb-ba82-e1e84afa2aa4', 'Yukon', 'yukon', '2023-12-20 05:25:42.850291');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('75c74015-620a-4a64-9c36-eba2d37b1a63', 'd5f66128-713a-42ca-a288-47d10078c03d', 'Urus', 'urus', '2023-12-20 05:26:37.104515');
INSERT INTO models (id, brand_id, name, slug, created_at) VALUES ('aa0b5979-a1e3-4857-9e94-ded31cb42c38', '904ba578-732a-45e5-b909-c447e2967478', 'G63', 'g63', '2023-12-20 05:27:34.985845');
`) 


await KnexService.raw(`
INSERT INTO users (user_id, first_name, last_name, phone_number, password, created_at, updated_at) VALUES ('64757f0b-0143-4c19-816d-6b3c5e169f45', 'Admin', 'Admin', '900474227', '$2b$10$JhH/gz5A0p/Jh3n8cSimRuqkpa8nDRFNZfOoZtvv6tAcJwWG445vS', '2023-12-16 16:49:42.978574', '2023-12-16 16:49:42.978574');
`) 

await KnexService.raw(`
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('65e3b48e-1890-4d90-a940-84f08d150ce8', '16124e2b-98dc-4779-b0dd-452c8f4dc832', '402c519b-7aa2-479a-b366-3260fba2dedd', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'red', '2018', '6', '350', 4, 'MT', '1.6', 'front', 'disel', 200, 300, 0, '1500', '1000', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'f4a1a0c4-03d4-4f56-9741-bab882b70a81', '2023-12-20 05:44:35.506922', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('dd4d8226-ad79-484e-abe6-206ca2c99859', '217cc2cc-d095-4efe-b9d4-0c92dd3b3e7d', '402c519b-7aa2-479a-b366-3260fba2dedd', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'green', '2021', '3.5', '240', 3, 'AT', 'V8', 'full', 'gas', 3333, 4400, 200, '300', '300', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'f4a1a0c4-03d4-4f56-9741-bab882b70a81', '2023-12-22 18:33:54.831001', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('16dea249-e213-40ff-828c-4dea27324aaa', '8f716b5d-196a-48fd-b8dd-961855da2067', '75c74015-620a-4a64-9c36-eba2d37b1a63', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'yellow', '2016', '2.3', '300', 33, 'AT', 'V10', 'Full', '200', 444, 3333, 300, '2000', '1000', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'f4a1a0c4-03d4-4f56-9741-bab882b70a81', '2023-12-22 18:30:24.883619', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('780c39cd-c612-4c29-a7ef-9e39b986328e', '904ba578-732a-45e5-b909-c447e2967478', 'f9853b46-c092-4b92-a751-928760e54399', '70e02b6e-4f50-483b-9716-3f04abd57959', 'black', '2020', '4', '270', 4, 'AT', '5.6L', 'behind', 'petrol', 300, 400, 1000, '2500', '900', '5d48d158-9de2-4c33-8ff1-fa6c59a3110d', '11003b30-8002-4233-9d8b-005263b55cd6', '2023-12-20 05:45:53.45115', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('acee5849-4215-4d0e-b685-ea0de8d1c453', 'c13bf68f-ab46-4306-b525-8e6eb62e02f2', 'd5c33cec-63f3-443a-b283-bb3fc0d19843', '70e02b6e-4f50-483b-9716-3f04abd57959', 'Black', '2020', '4', '340', 4, 'AT', 'V8', 'front', 'gas', 300, 1000, 300, '1200', '150', '5d48d158-9de2-4c33-8ff1-fa6c59a3110d', '45f4bded-3eeb-4f9c-8eee-f817b804b3ec', '2023-12-20 05:42:59.962713', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('2acf9197-49a7-46bf-b6d9-0087cc99f90b', 'e5aebdb7-6de8-4db8-bfd0-f5a95e63ba28', 'cee024ae-0551-44dc-b100-1a4586763aab', '70e02b6e-4f50-483b-9716-3f04abd57959', 'black', '2023', '6', '310', 6, 'AT', 'V10', 'Full', 'petrol', 300, 2000, 1000, '3000', '2500', '5d48d158-9de2-4c33-8ff1-fa6c59a3110d', 'b029538b-8146-44f2-9d21-9949ffda29de', '2023-12-20 05:48:30.738857', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('fac8b72f-ea31-4f32-9c48-bd4fb1528661', '90c439d8-6461-460e-a833-5b50758e9b34', '89ce247f-087d-46eb-a36c-db8915964356', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'blue', '2018', '2.3', '350', 3, 'AT', '4.5L', 'front', 'petrol', 240, 1200, 300, '2100', '2000', '2a6e933e-4b5c-48ff-b624-c00ec2407215', '5ed40ab6-133d-4897-bf98-8f68b35dfdd9', '2023-12-20 05:50:14.1707', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('37131aaf-fd07-4b00-b36f-0f01e4aeb518', '07b21d59-0700-4f41-9ed3-46f0a2646125', 'e23d65ae-f657-41aa-97a3-294c5a887f5b', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'black', '2016', '2.3', '300', 3, 'MT', 'V10', 'Full', '200', 300, 200, 300, '300', '1000', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'f4a1a0c4-03d4-4f56-9741-bab882b70a81', '2023-12-21 14:04:56.854664', '600', '500', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('de09871d-9fc5-44c4-84e8-3b289a483959', '07b21d59-0700-4f41-9ed3-46f0a2646125', '23b40880-f6a8-4a8d-a2ea-98b54787eee9', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'black-mat', '2019', '5', '300', 5, 'AT', 'V9', 'full', 'petrol', 400, 300, 300, '2000', '1100', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'ed1193e9-6002-45a7-b324-e65350e9ba6a', '2023-12-20 05:47:23.850815', '', '', false);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('5abf8885-0292-46fb-a96e-dba8708cc313', '217cc2cc-d095-4efe-b9d4-0c92dd3b3e7d', '85c92dde-6878-470b-be80-a3cb8f09bea9', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'red', '2016', '3.4', '300', 30, 'AT', 'V10', 'Full', 'petrol', 33, 2300, 300, '2000', '3444', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'ed1193e9-6002-45a7-b324-e65350e9ba6a', '2023-12-22 17:31:53.345891', '', '', true);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('4160ffd0-77de-41c2-94ce-bd865ea2db8e', 'e5aebdb7-6de8-4db8-bfd0-f5a95e63ba28', 'cee024ae-0551-44dc-b100-1a4586763aab', 'c037149e-0929-4a06-ab2a-a6ae5a43a3a1', 'green', '2021', '3.5', '240', 300, 'AT', 'V8', 'full', 'petrol', 3344, 800, 200, '4900', '2300', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'f4a1a0c4-03d4-4f56-9741-bab882b70a81', '2023-12-21 17:51:41.691102', '', '', true);
INSERT INTO cars (id, brand_id, model_id, city_id, color, year, seconds, max_speed, max_people, transmission, motor, drive_side, petrol, limitperday, deposit, premium_protection, price_in_aed, price_in_usd, location_id, category_id, created_at, price_in_aed_sale, price_in_usd_sale, inclusive) VALUES ('d47ccf1f-6f50-49ba-af61-cb38605904af', '217cc2cc-d095-4efe-b9d4-0c92dd3b3e7d', '89ce247f-087d-46eb-a36c-db8915964356', '70e02b6e-4f50-483b-9716-3f04abd57959', 'green', '2021', '3.5', '240', 3, 'AT', 'V8', 'full', 'gas', 330, 200, 200, '300', '300', '2a6e933e-4b5c-48ff-b624-c00ec2407215', 'f4a1a0c4-03d4-4f56-9741-bab882b70a81', '2023-12-21 17:50:15.813419', '', '', false);
`) 

await KnexService.raw(`
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('55e2b27d-7084-4c7f-94c6-4d37b783bf2d', 'f219c7b2-b5d8-415d-aa41-2924771f6a60', 'acee5849-4215-4d0e-b685-ea0de8d1c453', false, '2023-12-20 05:42:59.974853+00', '2023-12-20 05:42:59.974853+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('7eca15e3-ff35-44ea-984d-4ddc572e95e2', 'f05ba7cc-62e8-48c3-ac83-f5dcd5ccb4c1', 'acee5849-4215-4d0e-b685-ea0de8d1c453', false, '2023-12-20 05:42:59.978074+00', '2023-12-20 05:42:59.978074+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('0a305ea7-d07f-4d6d-beb5-bf2eb8de25ab', 'c8f95950-7315-4724-a625-81e33e8c50dc', '65e3b48e-1890-4d90-a940-84f08d150ce8', false, '2023-12-20 05:44:35.519164+00', '2023-12-20 05:44:35.519164+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('85a15e8a-3c58-43d1-a15d-f5f82fc206aa', '4799b859-cde5-45b8-803c-c96d6208d883', '65e3b48e-1890-4d90-a940-84f08d150ce8', false, '2023-12-20 05:44:35.52555+00', '2023-12-20 05:44:35.52555+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('56f9bf63-be39-4a90-8d65-27d4b1cb09dc', 'e5ee4b4f-fcc5-4159-a7cd-3923ef163f55', '780c39cd-c612-4c29-a7ef-9e39b986328e', false, '2023-12-20 05:45:53.458785+00', '2023-12-20 05:45:53.458785+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('e23bcdba-71b0-4064-abba-54b7f5c626fa', '1f4b455c-430e-491f-89a2-8fd69ac5bf13', '780c39cd-c612-4c29-a7ef-9e39b986328e', false, '2023-12-20 05:45:53.464963+00', '2023-12-20 05:45:53.464963+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('0992a812-115e-4f7e-8061-216cc26ee64d', 'b280b6d3-5a56-43c7-b08a-6ef7ba2830a1', 'de09871d-9fc5-44c4-84e8-3b289a483959', false, '2023-12-20 05:47:23.861388+00', '2023-12-20 05:47:23.861388+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('26f18062-fbdd-44cd-b821-7a375c1f8d0c', '02188722-e9b5-484d-a222-65c703b2c2fe', 'de09871d-9fc5-44c4-84e8-3b289a483959', false, '2023-12-20 05:47:23.868715+00', '2023-12-20 05:47:23.868715+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('ca288895-a0a9-46be-88e9-c96d391e978f', 'e33b8455-524e-4762-acb4-b7a296e25ac0', '2acf9197-49a7-46bf-b6d9-0087cc99f90b', false, '2023-12-20 05:48:30.746943+00', '2023-12-20 05:48:30.746943+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('441a2491-9475-4558-94f9-2a1bd5c43434', '94ed7f89-8bd1-4247-80c8-7bd89c92a455', '2acf9197-49a7-46bf-b6d9-0087cc99f90b', false, '2023-12-20 05:48:30.755898+00', '2023-12-20 05:48:30.755898+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('76f7f53c-e8aa-4456-9180-1a3239afe07e', '9703b7bc-0fa3-48ac-87a3-7eeb6d00ff8f', 'fac8b72f-ea31-4f32-9c48-bd4fb1528661', false, '2023-12-20 05:50:14.183035+00', '2023-12-20 05:50:14.183035+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('f273b0f4-b98b-4146-8fb3-797804036464', '649fe8bb-d0b9-4fde-bf92-7f0b389625e7', 'fac8b72f-ea31-4f32-9c48-bd4fb1528661', false, '2023-12-20 05:50:14.223095+00', '2023-12-20 05:50:14.223095+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('0e452ddf-3fe5-4894-82d2-8ada06a703c7', 'c7c53fd2-98e8-4282-8296-67a92b4cdd79', '37131aaf-fd07-4b00-b36f-0f01e4aeb518', false, '2023-12-21 14:04:56.883633+00', '2023-12-21 14:04:56.883633+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('79730197-d4b9-4bb5-a10d-c0f410e16960', '3080a6ae-8578-4799-9d81-cc6849bab742', '37131aaf-fd07-4b00-b36f-0f01e4aeb518', false, '2023-12-21 14:04:56.893106+00', '2023-12-21 14:04:56.893106+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('7a47c82b-af3b-47b8-af8a-932643b9d99b', '07fe278e-f759-4d73-82a3-54b14595793c', 'd47ccf1f-6f50-49ba-af61-cb38605904af', false, '2023-12-21 17:50:15.824768+00', '2023-12-21 17:50:15.824768+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('f3abb192-c04b-4ce9-b6c7-cb4bb62ce238', 'c16bd317-4009-4d42-9048-9a47d6953da0', 'd47ccf1f-6f50-49ba-af61-cb38605904af', false, '2023-12-21 17:50:15.834912+00', '2023-12-21 17:50:15.834912+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('00b904f6-2571-4e3d-825d-12f5a3e1cb28', 'fafcf1d8-be23-47f6-89e0-acd7db86db9d', 'd47ccf1f-6f50-49ba-af61-cb38605904af', false, '2023-12-21 17:50:15.844021+00', '2023-12-21 17:50:15.844021+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('fe3a210b-20d3-424c-b9ea-e24d14f75974', '92b28ee6-40bb-4691-a8a8-588c0ccee964', 'd47ccf1f-6f50-49ba-af61-cb38605904af', false, '2023-12-21 17:50:15.847694+00', '2023-12-21 17:50:15.847694+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('000477fa-e8d2-4266-ae6c-bbb0aa139346', '14f379aa-8cf6-4c85-a621-0ea56c8f5ee7', '4160ffd0-77de-41c2-94ce-bd865ea2db8e', false, '2023-12-21 17:51:41.703073+00', '2023-12-21 17:51:41.703073+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('26ce07a9-0e2d-40df-a05f-54b541760763', '81251c4d-3412-41ce-8e3f-c40435a6e0d7', '4160ffd0-77de-41c2-94ce-bd865ea2db8e', false, '2023-12-21 17:51:41.71083+00', '2023-12-21 17:51:41.71083+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('067f68f6-05a5-4641-bfc3-6590779587c2', '5dc34a43-e4e1-447a-883e-d6b53bbc52be', '4160ffd0-77de-41c2-94ce-bd865ea2db8e', false, '2023-12-21 17:51:41.715188+00', '2023-12-21 17:51:41.715188+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('5f9f1fdb-52ce-4766-839e-11c030400c84', '77f88b00-4a2b-43ff-8f1e-e8284b7fc769', '5abf8885-0292-46fb-a96e-dba8708cc313', false, '2023-12-22 17:31:53.359048+00', '2023-12-22 17:31:53.359048+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('99f3b9a0-75b9-4a06-bb4d-44fb03fa34cf', '1fe2e5a9-7b8f-4f45-b1c7-a0fb0031df52', '5abf8885-0292-46fb-a96e-dba8708cc313', false, '2023-12-22 17:31:53.372075+00', '2023-12-22 17:31:53.372075+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('fd3f86d3-3389-4ac6-a555-32cddbb2472e', '07f064b0-2139-45ba-bf0b-1ea72ecd5b9c', '5abf8885-0292-46fb-a96e-dba8708cc313', false, '2023-12-22 17:31:53.37596+00', '2023-12-22 17:31:53.37596+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('d7ae8e28-f61a-4fd0-a6a1-646976a901c5', '0c538d7e-9e7b-4f02-a9cf-a114da1cdbb5', '5abf8885-0292-46fb-a96e-dba8708cc313', false, '2023-12-22 17:31:53.385822+00', '2023-12-22 17:31:53.385822+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('6c04faf3-3453-4082-857a-6a9ee142f1e4', '59bc3f73-8563-4b08-bc77-39ee800ed9b7', '5abf8885-0292-46fb-a96e-dba8708cc313', false, '2023-12-22 17:31:53.39038+00', '2023-12-22 17:31:53.39038+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('19c6a653-b80d-43ce-863b-30d4fb131cbc', 'cb974646-a65d-4398-848a-9a7184d79a9e', '16dea249-e213-40ff-828c-4dea27324aaa', false, '2023-12-22 18:30:24.912124+00', '2023-12-22 18:30:24.912124+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('d4b1a0ad-8700-435d-8092-e580aadbfde9', '9d458642-17b5-4350-97c0-3b29efaa58a7', '16dea249-e213-40ff-828c-4dea27324aaa', false, '2023-12-22 18:30:24.915425+00', '2023-12-22 18:30:24.915425+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('9611fce9-70f7-414e-8bc2-c7dd1dc53110', '5bde901d-7ab3-46d7-bb2d-41b05f7a33ea', '16dea249-e213-40ff-828c-4dea27324aaa', false, '2023-12-22 18:30:24.921937+00', '2023-12-22 18:30:24.921937+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('28213a06-fb38-4861-9a3a-3314553dd239', '074d5548-5c79-4433-9c59-e0ac14658037', 'dd4d8226-ad79-484e-abe6-206ca2c99859', false, '2023-12-22 18:33:54.872718+00', '2023-12-22 18:33:54.872718+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('4aa1882d-328a-4281-9ab8-354a21aa2621', '08b0b37b-832a-4e63-8646-ae0728024513', 'dd4d8226-ad79-484e-abe6-206ca2c99859', false, '2023-12-22 18:33:54.882278+00', '2023-12-22 18:33:54.882278+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('0c9965e0-4334-4f98-a966-3dc8684ecbb0', '0ca9a038-5db1-4b98-b713-eaec2caf7312', 'dd4d8226-ad79-484e-abe6-206ca2c99859', false, '2023-12-22 18:33:54.885731+00', '2023-12-22 18:33:54.885731+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('b86b35a7-3ee5-448f-b690-bb196ccd3198', '59f9215c-4ef4-4649-b45d-7c78c4898936', '780c39cd-c612-4c29-a7ef-9e39b986328e', true, '2023-12-23 06:48:45.553289+00', '2023-12-23 06:48:45.553289+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('6c0680b3-8969-46b9-be30-7f922b23118f', '8e4fe977-9bee-4125-be76-7746bb071845', 'acee5849-4215-4d0e-b685-ea0de8d1c453', true, '2023-12-23 06:50:15.606593+00', '2023-12-23 06:50:15.606593+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('b8e88ff7-1e02-416c-bf71-d0ebaff40af9', '48b7f445-25cb-4983-93ed-5762330c118a', '2acf9197-49a7-46bf-b6d9-0087cc99f90b', true, '2023-12-23 06:50:51.11746+00', '2023-12-23 06:50:51.11746+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('6713fae8-4eb6-42f8-b280-a7a3dd94e295', 'b0fff0e5-cff4-4e55-ac77-49e9217eda8d', 'fac8b72f-ea31-4f32-9c48-bd4fb1528661', true, '2023-12-23 06:51:31.281515+00', '2023-12-23 06:51:31.281515+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('fd8c97b1-fed7-4f63-bce2-f06bd7e88231', '836304cd-16f2-47b7-823c-0bb9436e1adc', '37131aaf-fd07-4b00-b36f-0f01e4aeb518', true, '2023-12-23 07:21:38.929166+00', '2023-12-23 07:21:38.929166+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('0b62db48-908b-4604-917d-2116fd3610a5', '37af0cc3-b89f-466f-abf1-65f841d4630b', 'de09871d-9fc5-44c4-84e8-3b289a483959', true, '2023-12-23 07:23:25.961556+00', '2023-12-23 07:23:25.961556+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('2f722643-b807-4d45-95c5-c95a67c4da36', 'afab9f17-5e8a-4f9a-b200-a0f3e2c48f89', '5abf8885-0292-46fb-a96e-dba8708cc313', true, '2023-12-23 07:24:45.403676+00', '2023-12-23 07:24:45.403676+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('16bd4b6f-f0b8-46c1-9120-21e76dfa5481', '515a4155-b32c-4260-a0d5-cb174654b613', '4160ffd0-77de-41c2-94ce-bd865ea2db8e', true, '2023-12-23 07:27:04.682103+00', '2023-12-23 07:27:04.682103+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('6240cb4d-5782-4e55-9825-a31991304f83', '17fd7eed-b971-419a-b2bd-5dd11be30a9b', 'd47ccf1f-6f50-49ba-af61-cb38605904af', true, '2023-12-23 07:28:54.429397+00', '2023-12-23 07:28:54.429397+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('8282a9c1-dfe9-4dcd-9e04-df260a795d6a', '6621e57e-1406-47ea-93c5-34fb01b7da57', '65e3b48e-1890-4d90-a940-84f08d150ce8', true, '2023-12-23 07:29:48.173226+00', '2023-12-23 07:29:48.173226+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('276d8053-5eed-4773-b08f-d83cbfb7bf32', 'ef574d28-000d-40d4-a60d-e7691ac97e00', 'dd4d8226-ad79-484e-abe6-206ca2c99859', true, '2023-12-23 07:31:09.031856+00', '2023-12-23 07:31:09.031856+00');
INSERT INTO car_images (id, image_id, car_id, is_main, created_at, updated_at) VALUES ('739192e6-2bcf-4514-83f5-2afc4b8229ca', '86e3c1f9-b8e1-466d-bb0d-f8a72b223805', '16dea249-e213-40ff-828c-4dea27324aaa', true, '2023-12-23 07:32:49.029549+00', '2023-12-23 07:32:49.029549+00');
`) 



}



}
