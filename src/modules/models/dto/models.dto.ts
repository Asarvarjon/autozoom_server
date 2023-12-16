import { IsNotEmpty, IsString, MaxLength , IsUUID} from 'class-validator';
import { ICreateModel } from '../interface/models.interface';

export class CreateModelDTO implements ICreateModel {
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    name: string;

  

    @IsNotEmpty()
    @IsString()
    @IsUUID() 
    brand_id: string;
}


export class UpdateModelDTO implements ICreateModel {
    @IsString()
    @MaxLength(1024)
    name: string;

 

    @IsUUID() 
    brand_id: string;
}
