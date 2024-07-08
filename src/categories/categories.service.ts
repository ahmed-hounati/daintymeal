import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie, CategorieDocument } from '../schema/category.schema';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { CloudinaryService } from 'src/cloudinary.service';

@Injectable()
export class CategorieService {
  constructor(@InjectModel(Categorie.name) private readonly categorieModel: Model<CategorieDocument>,
  private cloudinaryService: CloudinaryService,
) { }

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const { image } = createCategorieDto;
    const categoryCode = await this.generateCategoryCode();

    const uploadedImage = await this.cloudinaryService.uploadSVG(
      image, 'Category'
    );

    const newCategory = new this.categorieModel({
      ...createCategorieDto,
      category_code: categoryCode,
      image:uploadedImage.secure_url
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