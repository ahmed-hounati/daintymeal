import { IsNotEmpty, IsString } from 'class-validator';

export class GetHistoricTransactionsDto {
  @IsNotEmpty()
  @IsString()
  user: string;
}
