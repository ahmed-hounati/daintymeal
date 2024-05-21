import { IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TranslationDto {
  @IsString()
  name: string;
}

class TranslationsDto {
  @ValidateNested()
  @Type(() => TranslationDto)
  ar: TranslationDto;

  @ValidateNested()
  @Type(() => TranslationDto)
  fr: TranslationDto;
}

export class CreateCategorieDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsObject()
  @ValidateNested()
  @Type(() => TranslationsDto)
  readonly translation: TranslationsDto;
}
