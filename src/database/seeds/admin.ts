import { Admin } from './../../config/conf';
import { Knex } from "knex";
import { getFirst } from "../../modules/shared/utils/utils";
import { generateHash } from "../../modules/shared/utils/bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    const count = await knex("users").count("user_id"); 
    if (Number(count[0]?.count)) return
 
    // Inserts seed entries
    const admin = getFirst(
        await knex("users").insert(
            { first_name: "Admin", last_name: 'Admin', phone_number: Admin.phone_number, password: await generateHash(Admin.password)}
        ).returning("*")
    ) 
};

