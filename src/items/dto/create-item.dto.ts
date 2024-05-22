import { IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested, IsBoolean, IsDate, IsObject, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class NameDto {
    @IsString()
    @IsNotEmpty()
    en: string;

    @IsString()
    @IsNotEmpty()
    fr: string;

    @IsString()
    @IsNotEmpty()
    ar: string;
}


export class StaticsDto {
    @IsNotEmpty()
    contRatings: number;

    @IsNotEmpty()
    countSaves: number;

    @IsNotEmpty()
    countOrders: number;
}

export class CreateItemDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => NameDto)
    name: NameDto;

    @IsMongoId({ each: true })
    @IsNotEmpty()
    categoryId: string;

    @IsArray()
    image: string[];

    @ValidateNested()
    @Type(() => StaticsDto)
    statics: StaticsDto;

    @IsEnum(["ACTIVE", "INACTIVE", "BANNED"], {
        message: 'valid role pls'
    })
    status: "ACTIVE" | "INACTIVE" | "BANNED";

    @IsBoolean()
    valid: boolean;
}
