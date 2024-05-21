import { Injectable, NotFoundException } from '@nestjs/common';
import { Resto } from '../schema/resto.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestoDto } from './dto/create-resto.dto';
import { UpdateRestoDto } from './dto/update-resto.dto';

@Injectable()
export class RestosService {
    constructor(@InjectModel(Resto.name) private restoModel: Model<Resto>) { }

    async findAll(language: string): Promise<any>  {
        const restos = this.restoModel.find().exec();
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
        const createdResto = new this.restoModel(createRestoDto)
        const existingResto = await this.restoModel.findOne({ name: createRestoDto.name }).exec()
        if (existingResto) {
            throw new NotFoundException('Restaurant already found')
        }
        return await createdResto.save();
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