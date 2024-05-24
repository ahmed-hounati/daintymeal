import { IsString, IsEmail, IsDate, IsEnum, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class Address {
    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    country: string;
}


enum Gender {
    Male = 'M',
    Female = 'F',
    Other = 'O'
}

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    user_code: string;

    @IsEmail()
    email: string;

    @IsString()
    avatar: string;

    @IsString()
    fullname: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsDate()
    birthdate: Date;

    @ValidateNested()
    @Type(() => Address)
    fr: Address;

    @ValidateNested()
    @Type(() => Address)
    en: Address;

    @ValidateNested()
    @Type(() => Address)
    ar: Address;

    @IsString()
    status: string;

    @IsString()
    gsm: string;

    @IsString()
    language_default: string;

    @IsDate()
    added_date: Date;

    @IsString()
    type_service: string;

    @IsOptional()
    @IsString()
    instagram: string;

    @IsOptional()
    @IsString()
    facebook: string;
}
