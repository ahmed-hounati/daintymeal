import { IsString, IsNotEmpty} from 'class-validator';

export class CreateWatchlistDto {
  @IsString()
  @IsNotEmpty()
  user_code: string;

  @IsString()
  @IsNotEmpty()
  plat_code: string;
}
