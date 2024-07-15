import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginPhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
  readonly phoneNumber: string;
}
