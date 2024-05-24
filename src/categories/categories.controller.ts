import { Controller, Post, Body, Get } from '@nestjs/common';
import { CategorieService } from './categories.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { Categorie } from '../schema/category.schema';

@Controller('categories')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) { }

  @Post()
  async create(@Body() createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    return this.categorieService.create(createCategorieDto);
  }

  @Get()
  async findAll(): Promise<Categorie[]> {
    return this.categorieService.findAll();
  }
}
