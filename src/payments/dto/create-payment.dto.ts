import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FoodItemDto {
    @IsNotEmpty()
    @IsString()
    plat_code: string;


    @IsNotEmpty()
    @IsNumber()
    quantity: number;
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
    @IsString()
    currency: string;

    @IsNotEmpty()
    @IsString()
    type_service: string;


    @IsNotEmpty()
    @IsString()
    method_payment: string;
}
