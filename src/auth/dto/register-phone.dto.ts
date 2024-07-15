import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SignUpPhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber(null, { message: 'Please enter a valid phone number' })
  readonly phoneNumber: string;
}
