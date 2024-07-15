import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plat, PlatDocument } from '../schema/plat.schema';
import { CreatePlatDto } from './dto/create-plat.dto';
import { Categorie, CategorieDocument } from '../schema/category.schema';
import { Resto, RestoDocument } from 'src/schema/resto.schema';
import { CloudinaryService } from 'src/cloudinary.service';

@Injectable()
export class PlatService {
    constructor(
        @InjectModel(Plat.name) private readonly platModel: Model<PlatDocument>,
        @InjectModel(Categorie.name) private readonly categorieModel: Model<CategorieDocument>,
        @InjectModel(Resto.name) private readonly restoModel: Model<RestoDocument>,
        private cloudinaryService: CloudinaryService,


    ) { }

    async create(createPlatDto: CreatePlatDto): Promise<Plat> {
        const { resto_code,image, category_code, ...rest } = createPlatDto;

        const category = await this.categorieModel.findOne({ category_code });
        const resto = await this.restoModel.findOne({ resto_code });


        if (!category) {
            throw new NotFoundException(`Category with code ${category_code} not found`);
        }
        if (!resto) {
            throw new NotFoundException(`Category with code ${resto_code} not found`);
        }
        const platCode = await this.generatePlatCode();
        const uploadedImages = [];
        for (const imageUrl of image) {
            try {
                const uploadedImage = await this.cloudinaryService.uploadImage(imageUrl, 'plats');
                uploadedImages.push(uploadedImage.secure_url);
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new NotFoundException('Error uploading image(s)');
            }
        }

        const plat = new this.platModel({
            ...rest,
            image:uploadedImages,
            plat_code: platCode,
            category: category,
            resto: resto.resto_code
        });

        const createdPlat = await (plat.save() as Promise<Plat>);
        resto.plats.push(createdPlat.plat_code);
        await resto.save();
    
        return createdPlat;
    }

    private async generatePlatCode(): Promise<string> {
        const plats = await this.platModel.find().sort({ plat_code: -1 }).limit(1).exec();
        const lastPlatCode = plats.length ? plats[0].plat_code : 'plt_000';
        const newCodeNumber = parseInt(lastPlatCode.split('_')[1]) + 1;
        return `plt_${newCodeNumber.toString().padStart(3, '0')}`;
    }

    async findAll(): Promise<Plat[]> {
        return this.platModel.find().exec();
    }
    
    async findByCode(platCode: string): Promise<Plat> {
        const plat = await this.platModel.findOne({ plat_code: platCode }).exec();
        if (!plat) {
            throw new NotFoundException(`Plat with code ${platCode} not found`);
        }
        return plat;
    }

    async findTwoPlats(): Promise<Plat[]> {
        return this.platModel.find().limit(2).exec();
    }

    async findTrendingPlats(): Promise<Plat[]> {
        return this.platModel.aggregate([
            { $match: { rating: { $gt: 4 } } } 
        ]).exec();
    }
    async findMostSalesPlats(): Promise<Plat[]> {
        return this.platModel.aggregate([
            { $sample: { size: 5 } }
        ]).exec();
    }
    async searchItems(searchItemDto: CreatePlatDto): Promise<Plat[]> {
        const { name, category_code, ...rest } = searchItemDto;

        const query: any = { ...rest };
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (category_code) {
            query.category_code = category_code;
        }

        const items = await this.platModel.find(query).exec();
        if (!items || items.length === 0) {
            throw new NotFoundException('No items found matching the search criteria');
        }
        return items;
    }
    async findPlatsByCategory(categoryCode: string): Promise<Plat[]> {
        try {
          const plats = await this.platModel.find({
            'category.category_code': categoryCode,
          }).exec();
          return plats;
        } catch (error) {
          throw new Error(`Error finding plats by category: ${error.message}`);
        }
    }
}