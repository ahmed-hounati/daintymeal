import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CategorieService } from './categories.service';
import { Categorie } from 'src/schema/category.schema';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Controller('categories')
export class CategorieController {
    constructor(private readonly categorieService: CategorieService) {}
   
    @Get()
  async findAll(): Promise<Categorie[]> {
    return this.categorieService.findAll();
  }
    @Post()
  async create(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categorieService.create(createCategorieDto);
  }

}
