import { IsString, IsArray, IsObject, IsBoolean, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlatDto {
    @IsString()
    @IsNotEmpty()
    item_code: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    category_code: string;

    @IsArray()
    @IsString({ each: true })
    image: string[];

    @IsObject()
    statics: {
        contRatings: number;
        countSaves: number;
        countOrders: number;
    };

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsBoolean()
    @IsNotEmpty()
    valid: boolean;

    @IsNumber()
    @IsNotEmpty()
    rating: number;

    @IsString()
    @IsNotEmpty()
    item_price: number;

    @IsString()
    @IsNotEmpty()
    currency: string;

    @IsNumber()
    discount: number;
}
