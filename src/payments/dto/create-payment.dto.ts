import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FoodItemDto {
  @IsNotEmpty()
  @IsString()
  item_code: string;

  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsNotEmpty()
  @IsNumber()
  item_price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNumber()
  discount: number;
}

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  user_code: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FoodItemDto)
  food_list: FoodItemDto[];

  @IsNotEmpty()
  @IsNumber()
  total_amount_HT: number;

  @IsNotEmpty()
  @IsNumber()
  tva_amount: number;

  @IsNotEmpty()
  @IsNumber()
  total_amount_TTC: number;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsNotEmpty()
  @IsString()
  method_payment: string;
}
