import { ICreateBrand } from '../interface/brands.interface';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBrandDTO implements ICreateBrand {
    

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    title: string;
}

export class UpdateBrandDTO implements ICreateBrand { 
    @IsString()
    @MaxLength(255)
    title: string;
}
