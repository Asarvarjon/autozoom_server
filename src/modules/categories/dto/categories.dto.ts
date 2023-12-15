import { ICreateCategory } from './../interface/categories.interface';
 
import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength, IsArray, IsNumber, IsBoolean } from 'class-validator'; 

export class CreateCategoryDTO implements ICreateCategory {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(256)
    name_en: string; 

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(256)
    name_ru: string;    
}


export class UpdateCategoryDTO implements ICreateCategory {  
    @IsString() 
    name_en: string; 

    @IsString() 
    name_ru: string;   
}