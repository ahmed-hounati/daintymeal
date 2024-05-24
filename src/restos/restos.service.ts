import { Injectable, NotFoundException } from '@nestjs/common';
import { Resto } from '../schema/resto.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestoDto } from './dto/create-resto.dto';
import { UpdateRestoDto } from './dto/update-resto.dto';
import { CloudinaryService } from 'src/cloudinary.service';
import { Categorie } from '../schema/category.schema';
import { Address } from '../schema/address.schema';
@Injectable()
export class RestosService {
    constructor(
        @InjectModel(Resto.name) private restoModel: Model<Resto>,
        @InjectModel(Categorie.name) private categorieModel: Model<Categorie>,
        @InjectModel(Address.name) private addressModel: Model<Address>,

        private cloudinaryService: CloudinaryService,
    ) {}
    async findAll(language: string): Promise<any> {
        const restos = await this.restoModel.find().exec();
        return restos.map((restaurant) => {
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
        const { name, address, categoryIds, image, status, rating, workingTime, valid, statics } = createRestoDto;
        const existingResto = await this.restoModel.findOne({ 'name.en': name.en }).exec();
        if (existingResto) {
            throw new NotFoundException('Restaurant with this name already exists');
        }

        const categories = await this.categorieModel.find({ _id: { $in: categoryIds } }).exec();
        if (categories.length !== categoryIds.length) {
            throw new NotFoundException('One or more categories not found');
        
        }
        const uploadedImages = [];
        for (const imageUrl of image) {
            try {
                const uploadedImage = await this.cloudinaryService.uploadImage(imageUrl, 'restaurant');
                uploadedImages.push(uploadedImage.secure_url);
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new NotFoundException('Error uploading image(s)');
            }
        }
        const addressObj = await this.addressModel.findById(address).exec();
        if (!addressObj) {
            throw new NotFoundException('Address not found');
        }
        const createdResto = new this.restoModel({
            name,
            categories,
            address:addressObj,
            image:uploadedImages,
            status,
            rating,
            workingTime,
            valid,
            statics,
        });
        return createdResto.save();
    }

    async update(id: string, updateRestoDto: UpdateRestoDto) {
        const updatedResto = this.restoModel.findByIdAndUpdate(id, updateRestoDto, { new: true });
        try {
            await updatedResto;
            return "Restaurant updated successfully";
        } catch {
            throw new NotFoundException('Restaurant not found');
        }
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