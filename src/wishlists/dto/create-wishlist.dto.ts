import { IsString, IsArray, IsDate } from 'class-validator';

export class WishlistDto {
    @IsString()
    readonly user_code: string;

    @IsArray()
    @IsString({ each: true })
    readonly item_code: string[];

    @IsDate()
    readonly addedAt: Date;
}