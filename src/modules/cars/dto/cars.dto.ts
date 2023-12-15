import { ICreateCar } from './../interface/cars.interface';
import { IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';
 

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
    @IsNumber()
    max_people: number;

    @IsNotEmpty()
    @IsString()
    tranmission: string;

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
    @IsNumber()
    limitPerDay: number;

    @IsNotEmpty()
    @IsNumber()
    deposit: number;

    @IsNotEmpty()
    @IsNumber()
    premium_protection: number;

    @IsNotEmpty()
    @IsString()
    price_in_AED: string;

    @IsNotEmpty()
    @IsString()
    price_in_USD: string;

    @IsNotEmpty()
    @IsUUID()
    location_id: string;
}

export class UpdateCarDTO implements ICreateCar {
    @IsUUID()
    brand_id: string;

    @IsUUID()
    model_id: string;

    @IsUUID()
    city_id: string;

    @IsString()
    color: string;

    @IsString()
    year: string;

    @IsString()
    seconds: string;

    @IsString()
    max_speed: string;

    @IsNumber()
    max_people: number;

    @IsString()
    tranmission: string;

    @IsString()
    motor: string;

    @IsString()
    drive_side: string;

    @IsString()
    petrol: string;

    @IsNumber()
    limitPerDay: number;

    @IsNumber()
    deposit: number;

    @IsNumber()
    premium_protection: number;

    @IsString()
    price_in_AED: string;

    @IsString()
    price_in_USD: string;

    @IsUUID()
    location_id: string;
}
