import { IsNotEmpty, IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';

import { Status, Statics, Image, Category } from '../../schema/resto.schema';
import { Type } from 'class-transformer';

export class TranslationsDto {
    @IsNotEmpty()
    @IsString()
    en: string;

    @IsNotEmpty()
    @IsString()
    fr: string;

    @IsNotEmpty()
    @IsString()
    ar: string;
}

export class Address {
    @IsNotEmpty()
    @IsString()
    en: string;

    @IsNotEmpty()
    @IsString()
    fr: string;

    @IsNotEmpty()
    @IsString()
    ar: string;
}

export class CreateRestoDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TranslationsDto)
    name: TranslationsDto;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => Address)
    address: Address;

    @IsNotEmpty()
    @ValidateNested()
    category: Category;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    image: Image[];

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    workingTime: string;

    @IsNotEmpty()
    valid: boolean;

    @IsNotEmpty()
    @ValidateNested()
    statics: Statics;
}
