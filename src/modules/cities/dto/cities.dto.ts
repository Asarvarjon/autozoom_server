import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ICreateCity } from '../interface/cities.interface';

export class CreateCityDTO implements ICreateCity {
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    name: string;

  

    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    text: string;
}


export class UpdateCityDTO implements ICreateCity {
    @IsString()
    @MaxLength(1024)
    name: string;

 
    @IsString()
    @MaxLength(1024)
    text: string;
}
