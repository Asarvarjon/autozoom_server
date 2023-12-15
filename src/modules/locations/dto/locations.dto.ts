import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ICreateLocation } from '../interface/locations.interface';

export class CreateLocationDTO implements ICreateLocation {
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    slug: string;
}


export class UpdateLocationDTO implements ICreateLocation {
    @IsString()
    @MaxLength(1024)
    name: string;

    @IsString()
    @MaxLength(1024)
    slug: string;
}
