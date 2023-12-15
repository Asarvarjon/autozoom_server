import { IConfirmOtp, IResendOtp } from './../interface/otps.interface';
import { ICreateUser } from './../../users/interface/users.interface';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { 
  ISignin, 
} from '../interface/auth.interface'; 

export class SigninDTO implements ISignin {
  @IsDefined()
  @IsNotEmpty() 
  @IsString()
  phone_number: string; 

  @IsDefined()
  @IsNotEmpty() 
  @IsString()
  password: string; 
}   

export class SignUpDTO implements ICreateUser {
  @IsDefined()
  @IsNotEmpty() 
  @IsString()
  @IsPhoneNumber('UZ')
  phone_number: string; 

  @IsDefined()
  @IsNotEmpty() 
  @IsString()
  first_name: string;
 
  @IsString()
  last_name: string;
 
  @IsNumber()
  role_id: number;
}   

export class ConfirmOtpDTO implements IConfirmOtp {
  @IsDefined({message: "Phone number is required"})
  @IsNotEmpty({message: "Phone number is required"})
  @IsPhoneNumber("UZ", {message: "Invalid phone number"})
  phone_number: string;

  @IsDefined({message: "Confirmation code is required"})
  @IsNotEmpty({message: "Confirmation code is required"})
  // @IsNumber({}, {message: "Confirmation code must be number"})
  code: number; 
}

export class ResendOtpDTO implements IResendOtp {
  @IsDefined({message: "Phone number is required"})
  @IsNotEmpty({message: "Phone number is required"})
  @IsPhoneNumber("UZ", {message: "Invalid phone number"})
  phone_number: string; 
}