import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie, CategorieDocument } from '../schema/category.schema';
import { CreateCategorieDto } from './dto/create-categorie.dto';

@Injectable()
export class CategorieService {
  constructor(@InjectModel(Categorie.name) private readonly categorieModel: Model<CategorieDocument>) { }

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const categoryCode = await this.generateCategoryCode();
    const newCategory = new this.categorieModel({
      ...createCategorieDto,
      category_code: categoryCode,
    });
    return newCategory.save();
  }

  private async generateCategoryCode(): Promise<string> {
    const categories = await this.categorieModel.find().sort({ category_code: -1 }).limit(1).exec();
    const lastCategoryCode = categories.length ? categories[0].category_code : 'cat_000';
    const newCodeNumber = parseInt(lastCategoryCode.split('_')[1]) + 1;
    return `cat_${newCodeNumber.toString().padStart(3, '0')}`;
  }

  async findAll(): Promise<Categorie[]> {
    return this.categorieModel.find().exec();
  }

}