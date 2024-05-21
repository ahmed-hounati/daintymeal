import { IsInt, IsString, Max, Min } from "class-validator";


class  CreateByDto{
    @IsString()
    name: string;


    @IsString()
    imageProfile: string;
}
export class CreateCommentDto{
    @IsString()
    createdBy: CreateByDto;

    @IsString()
    comment:string;

    @IsInt()
    @Min(0)
    @Max(5)
    rating:number;

    @IsString()
    addedAt:Date;
}