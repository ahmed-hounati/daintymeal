import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginEmailDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}