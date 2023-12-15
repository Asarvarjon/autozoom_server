import { ICreateAccessModule } from '../interface/resources.interface';
import { IsDefined, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'; 
 

export class CreateRoleResourceDTO implements ICreateAccessModule {
    @IsDefined()
    @IsNotEmpty()
    @IsString() 
    @IsUUID()
    access_module_id: string; 

    @IsDefined()
    @IsNotEmpty()
    @IsString()  
    role_id: string;
} 