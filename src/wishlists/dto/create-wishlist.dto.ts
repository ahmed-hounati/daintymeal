import { IsString, IsArray, IsDate } from 'class-validator';

export class WishlistDto {
    @IsString()
    readonly user_code: string;

    @IsArray()
    @IsString({ each: true })
    readonly items_codes: string[];

    @IsDate()
    readonly addedAt: Date;
}