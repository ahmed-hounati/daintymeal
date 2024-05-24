import { IsNotEmpty, IsString, IsEnum, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Status, Statics} from '../../schema/resto.schema';
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

export class CreateRestoDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => TranslationsDto)
    name: TranslationsDto;

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
}
