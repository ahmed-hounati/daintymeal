import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

export class CreateFilterDto {
  @IsNotEmpty()
  @IsString()
  filter_code: string;

  @IsNotEmpty()
  @IsString()
  icone_default: string;

  @IsArray()
  @Type(() => LanguageNameDto)
  ar: LanguageNameDto[];

  @IsArray()
  @Type(() => LanguageNameDto)
  fr: LanguageNameDto[];

  @IsArray()
  @Type(() => LanguageNameDto)
  en: LanguageNameDto[];

  @IsNotEmpty()
  @IsString()
  type_service: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  added_date: string;
}

export class AddFilterNameDto {
  @IsString()
  filter_code: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterNameDto)
  filterNames: FilterNameDto[];
}