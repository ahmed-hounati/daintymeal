import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../schema/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CloudinaryService } from 'src/cloudinary.service';
import { Categorie } from 'src/schema/category.schema';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>, @InjectModel(Categorie.name) private categorieModel: Model<Categorie>,
        private cloudinaryService: CloudinaryService,
    ) { }

    async findAll(language: string): Promise<any> {
        const items = this.itemModel.find().exec();
        return (await items).map((item) => {
            return {
                ...item.toObject(),
                name: item.name[language],
            };
        });
    }

    async findOne(id: string) {
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException('User not found');
        }
        return item;
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const { name, categoryId, image, statics, status, valid } = createItemDto;
        const existingItem = await this.itemModel.findOne({ name: createItemDto.name }).exec()
        if (existingItem) {
            throw new NotFoundException('Item with this name already exists')
        }
        const categorie = await this.categorieModel.find({ _id: { $in: categoryId } }).exec();
        const uploadedImages = [];
        for (const imageUrl of image) {
            try {
                const uploadedImage = await this.cloudinaryService.uploadImage(imageUrl, 'Items');
                uploadedImages.push(uploadedImage.secure_url);
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new NotFoundException('Error uploading image(s)');
            }
        }
        const createdItem = new this.itemModel({
            name,
            categorie,
            image: uploadedImages,
            status,
            valid,
            statics,
        });
        return await createdItem.save();
    }


    async update(id: string, updateItemDto: UpdateItemDto) {
        const updatedItem = this.itemModel.findByIdAndUpdate(id, updateItemDto, { new: true });
        try {
            await updatedItem;
            return "Item updated successfully";
        } catch {
            throw new NotFoundException('Item not found');
        }
    }

    async delete(id: string) {
        const item = await this.itemModel.findById(id);
        if (!item) {
            throw new NotFoundException('Item not found');
        }
        await this.itemModel.findByIdAndDelete(id);
        return "Item deleted successfully";
    }
}
