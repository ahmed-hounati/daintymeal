import { IsNotEmpty, IsString } from 'class-validator';

export class GetDetailTransactionDto {
  @IsNotEmpty()
  @IsString()
  transaction_code: string;
}
