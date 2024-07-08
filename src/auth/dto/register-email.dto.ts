import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpEmailDto {


  @IsNotEmpty()
  @IsString()
  readonly fullname: string;



  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;  
}