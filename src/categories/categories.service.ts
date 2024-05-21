import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie, CategorieDocument } from 'src/schema/category.schema';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { CloudinaryService } from 'src/cloudinary.service'; // Import CloudinaryService

@Injectable()
export class CategorieService {
  constructor(
    @InjectModel(Categorie.name) private categorieModel: Model<CategorieDocument>,
    private cloudinaryService: CloudinaryService, 
  ) {}

  async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
    const { name, image, translation } = createCategorieDto;
    const uploadedImage = await this.cloudinaryService.uploadImage(image, 'Categories');

    
    const createdCategorie = new this.categorieModel({
      name,
      image: uploadedImage.secure_url, 
      translation,
    });
    return createdCategorie.save();
  }

  async findAll(): Promise<Categorie[]> {
    return this.categorieModel.find().exec();
  }
}