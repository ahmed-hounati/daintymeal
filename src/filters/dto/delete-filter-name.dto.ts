import { IsString, IsArray } from 'class-validator';

class FilterName {
  @IsString()
  language: string;

  @IsString()
  name: string;
}

export class DeleteFilterNameDto {
  @IsString()
  filter_code: string;

  @IsArray()
  filterNames: FilterName[];
}
