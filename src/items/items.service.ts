import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>) { }

    findAll() {
        const items = this.itemModel.find().exec();
        return items
    }

    async findOne(id: string) {
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException('User not found');
        }
        return item;
    }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto)
        const existingCategory = await this.itemModel.findOne({ name: createItemDto.name }).exec()
        if (existingCategory) {
            throw new NotFoundException('Item already found')
        }
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
