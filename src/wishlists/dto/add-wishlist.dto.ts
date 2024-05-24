import { IsDate, IsString } from "class-validator";

export class AddWishlistDto {
    @IsString()
    user_code: string;

    @IsString()
    plat_code: string;

    @IsDate()
    addedAt: Date;
}
