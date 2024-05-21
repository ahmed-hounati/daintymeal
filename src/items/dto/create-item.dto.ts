import { IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested, IsBoolean, IsDate } from 'class-validator';
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

export class ImageDto {
    @IsString()
    @IsNotEmpty()
    public_id: string;

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsNotEmpty()
    secure_url: string;

    @IsString()
    @IsNotEmpty()
    format: string;
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

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    image: ImageDto[];

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
