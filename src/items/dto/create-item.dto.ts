import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsString()
    category: string;
    @IsString()
    image: string;
    valid: boolean;
    @IsEnum(["ACTIVE", "INACTIVE", "BANNED"], {
        message: 'valid role pls'
    })
    status: "ACTIVE" | "INACTIVE" | "BANNED";
    created_at: Date;
}