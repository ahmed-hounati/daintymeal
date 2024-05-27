import { IsNotEmpty, IsString, IsEnum, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Status, Statics } from '../../schema/resto.schema';
import { Type } from 'class-transformer';
class LanguageNameDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
class FilterNameDto {
    @IsNotEmpty()
    @IsString()
    language: 'ar' | 'fr' | 'en';

    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CreateRestoDto {
    
    @Type(() => LanguageNameDto)
    ar: LanguageNameDto;

    
    @Type(() => LanguageNameDto)
    fr: LanguageNameDto;


    @Type(() => LanguageNameDto)
    en: LanguageNameDto;

    @IsNotEmpty()
    @IsMongoId({ each: true })
    address: string;

    @IsNotEmpty()
    @IsMongoId({ each: true })
    categoryIds: string[];

    @IsNotEmpty()
    @IsArray()
    image: string[];

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


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FilterNameDto)
    filterNames: FilterNameDto[];
}
