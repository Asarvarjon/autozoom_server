import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ICreateModel } from '../interface/models.interface';

export class CreateModelDTO implements ICreateModel {
    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(1024)
    slug: string;
}


export class UpdateModelDTO implements ICreateModel {
    @IsString()
    @MaxLength(1024)
    name: string;

    @IsString()
    @MaxLength(1024)
    slug: string;
}
