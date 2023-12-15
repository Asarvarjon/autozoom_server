import { ICreateUser } from './../interface/users.interface';
import { IsArray, IsDefined, IsNotEmpty, IsString,  IsUUID,  MaxLength } from 'class-validator'; 


export class CreateUserDTO implements ICreateUser {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    first_name: string; 
 
    @IsString()
    @MaxLength(64)
    last_name: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(64)
    phone_number: string;
}


export class UpdateUserDTO implements ICreateUser {
    @IsString()
    @MaxLength(64)
    first_name: string; 

    @IsString()
    @MaxLength(64)
    last_name: string;

    @MaxLength(64)
    phone_number: string;
}