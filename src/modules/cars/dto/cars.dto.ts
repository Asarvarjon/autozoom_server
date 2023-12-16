import { ICreateCar } from './../interface/cars.interface';
import { IsNotEmpty, IsString, IsUUID,   IsOptional } from 'class-validator';
 

export class CreateCarDTO implements ICreateCar {
    @IsNotEmpty()
    @IsUUID()
    brand_id: string;

    @IsNotEmpty()
    @IsUUID()
    model_id: string;

    @IsNotEmpty()
    @IsUUID()
    city_id: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsNotEmpty()
    @IsString()
    year: string;

    @IsNotEmpty()
    @IsString()
    seconds: string;

    @IsNotEmpty()
    @IsString()
    max_speed: string;

    @IsNotEmpty()
    @IsString()
    max_people: number;

    @IsNotEmpty()
    @IsString()
    transmission: string;

    @IsNotEmpty()
    @IsString()
    motor: string;

    @IsNotEmpty()
    @IsString()
    drive_side: string;

    @IsNotEmpty()
    @IsString()
    petrol: string;
 

    @IsNotEmpty()
    @IsString()
    limitperday: number;

    @IsNotEmpty()
    @IsString()
    deposit: number;

    @IsNotEmpty()
    @IsString()
    premium_protection: number;

    @IsNotEmpty()
    @IsString()
    price_in_aed: string;

    @IsNotEmpty()
    @IsString()
    price_in_usd: string;

    @IsNotEmpty()
    @IsUUID()
    location_id: string;

    @IsNotEmpty()
    @IsUUID()
    category_id: string;
}

export class UpdateCarDTO implements ICreateCar {
    @IsUUID()
    brand_id: string;

    @IsUUID()
    model_id: string;

    @IsUUID()
    city_id: string;

    @IsString()
    seconds: string

    @IsString()
    color: string;

    @IsString()
    year: string;
 

    @IsString()
    max_speed: string;

    @IsString()
    max_people: number;

    @IsString()
    transmission: string;

    @IsString()
    motor: string;

    @IsString()
    drive_side: string;

    @IsString()
    petrol: string;

    @IsString()
    limitperday: number;

    @IsString()
    deposit: number;

    @IsString()
    premium_protection: number;

    @IsString()
    price_in_aed: string;

    @IsString()
    price_in_usd: string;

    @IsUUID()
    location_id: string;

    @IsUUID()
    category_id: string;
}
