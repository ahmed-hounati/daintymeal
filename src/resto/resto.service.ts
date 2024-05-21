import { Injectable, NotFoundException } from '@nestjs/common';
import { Resto } from '../schema/resto.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestoDto } from './dto/create-resto.dto';
import { Categorie } from 'src/schema/category.schema';
import { log } from 'console';

@Injectable()
export class RestosService {
    constructor(
        @InjectModel(Resto.name) private restoModel: Model<Resto>,
        @InjectModel(Categorie.name) private categorieModel: Model<Categorie>,) { }

    async findAll(language: string): Promise<any> {
        const restos = await this.restoModel.find().populate('categories').exec();
        console.log('====================================');
        console.log('====================================');
        return (await restos).map((restaurant) => {
            return {
                ...restaurant.toObject(),
                name: restaurant.name[language],
                address: restaurant.address[language]
            };
        });
    }

    async findOne(id: string) {
        const resto = await this.restoModel.findById(id).exec();
        if (!resto) {
            throw new NotFoundException('Restaurant not found');
        }
        return resto;
    }

    async create(createRestoDto: CreateRestoDto): Promise<Resto> {
        const { name, address, categoryIds, image, status, rating, workingTime, valid, statics , category } = createRestoDto;
        const existingResto = await this.restoModel.findOne({ 'name.en': name.en }).exec();
        if (existingResto) {
            throw new NotFoundException('Restaurant with this name already exists');
        }

        
        const categories = await this.categorieModel.find({ _id: { $in: categoryIds } }).exec();
        const categorie = await this.categorieModel.findOne({_id : { $in: category }}).exec();
        
        if (categories.length !== categoryIds.length) {
            throw new NotFoundException('One or more categories not found');
        }
        console.log('====================================');
        console.log(categories);
        console.log('====================================');

        const createdResto = new this.restoModel({
            name,
            categories,
            categorie,
            address,
            image,
            status,
            rating,
            workingTime,
            valid,
            statics,
        });

        return createdResto.save();
    }

    async delete(id: string) {
        const resto = await this.restoModel.findById(id);
        if (!resto) {
            throw new NotFoundException('Item not found');
        }
        await this.restoModel.findByIdAndDelete(id);
        return "Restaurant deleted successfully";
    }
}