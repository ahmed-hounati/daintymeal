import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plat, PlatDocument } from '../schema/plat.schema';
import { CreatePlatDto } from './dto/create-plat.dto';
import { Categorie, CategorieDocument } from '../schema/category.schema';

@Injectable()
export class PlatService {
    constructor(
        @InjectModel(Plat.name) private readonly platModel: Model<PlatDocument>,
        @InjectModel(Categorie.name) private readonly categorieModel: Model<CategorieDocument>
    ) { }

    async create(createPlatDto: CreatePlatDto): Promise<Plat> {
        const { category_code, ...rest } = createPlatDto;

        const category = await this.categorieModel.findOne({ category_code });

        if (!category) {
            throw new NotFoundException(`Category with code ${category_code} not found`);
        }
        const platCode = await this.generatePlatCode();

        const plat = new this.platModel({
            ...rest,
            plat_code: platCode,
            category: category,
        });

        return plat.save();
    }

    private async generatePlatCode(): Promise<string> {
        const plats = await this.platModel.find().sort({ item_code: -1 }).limit(1).exec();
        const lastPlatCode = plats.length ? plats[0].plat_code : 'plt_000';
        const newCodeNumber = parseInt(lastPlatCode.split('_')[1]) + 1;
        return `plt_${newCodeNumber.toString().padStart(3, '0')}`;
    }

    async findAll(): Promise<Plat[]> {
        return this.platModel.find().exec();
    }
}
