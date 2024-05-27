import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";


class CreateByDto {
    @IsString()
    name: string;


    @IsString()
    imageProfile: string;
}
export class CreateReviewplatDto {
    @IsString()
    createdBy: CreateByDto;

    @IsString()
    comment: string;

    @IsInt()
    @Min(0)
    @Max(5)
    rating: number;

    @IsString()
    addedAt: Date;

    @IsNotEmpty()
    @IsString()
    itemId: string;
}