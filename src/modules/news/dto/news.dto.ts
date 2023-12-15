 
import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength, IsArray, IsNumber, IsBoolean, IsEnum } from 'class-validator'; 

export class CreateNewsDto  {
    @IsDefined()
    @IsNotEmpty()
    @IsString() 
    title_uz: string;   
 
    @IsString() 
    title_en: string;   

    @IsString() 
    title_ru: string;   

    @IsDefined()
    @IsNotEmpty()
    @IsString() 
    text_uz: string;   
 
    @IsString() 
    text_en: string;   

    @IsString() 
    text_ru: string;  
}  