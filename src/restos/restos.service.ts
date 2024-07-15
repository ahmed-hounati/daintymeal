import { Injectable, NotFoundException } from '@nestjs/common';
import { AddFilterNameDto, Resto } from '../schema/resto.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestoDto } from './dto/create-resto.dto';
import { UpdateRestoDto } from './dto/update-resto.dto';
import { CloudinaryService } from 'src/cloudinary.service';
import { Categorie } from '../schema/category.schema';
import { Address } from '../schema/address.schema';
import { FiltersService } from 'src/filters/filters.service';
import { Plat } from 'src/schema/plat.schema';
@Injectable()
export class RestosService {
    constructor(
        @InjectModel(Resto.name) private restoModel: Model<Resto>,
        @InjectModel(Categorie.name) private categorieModel: Model<Categorie>,
        @InjectModel(Address.name) private addressModel: Model<Address>,
        @InjectModel(Plat.name) private platModel: Model<Plat>,

        private cloudinaryService: CloudinaryService,
        private filterService: FiltersService,
    ) { }
    async findAll(): Promise<any> {
        const restos = await this.restoModel.find().exec();
        return restos.map((restaurant) => {
            const restoObject = restaurant.toObject();
            const name = restaurant.en.name;
            const address = restaurant.address;
            const categories = restaurant.categories.map(category => {
                const categoryName = category.translation?.fr?.name;
                const categoryCode = category.category_code;
                return {
                    name: categoryName,
                    category_code: categoryCode
                };
            });
    
            return {
                ...restoObject,
                name,
                address,
                categories,
            };
        });
    }
    
    async findPopularRestos(): Promise<any> {
        const restos = await this.restoModel.find({ rating: { $gt: 4 } }).exec();
        return restos.map((restaurant) => {
            const restoObject = restaurant.toObject();
            const name = restaurant.en.name;
            const address = restaurant.address;
            const categories = restaurant.categories.map(category => {
                const categoryName = category.translation?.fr?.name;
                return {
                    name: categoryName
                };
            });

            return {
                ...restoObject,
                name,
                address,
                categories,
            };
        });
    }

    async findOneByCode(resto_code: string) {
        const resto = await this.restoModel.findOne({ resto_code }).exec();
        if (!resto) {
            throw new NotFoundException('Restaurant not found');
        }
        return resto;
    }

    async getPlatsByRestoCode(resto_code: string): Promise<Plat[]> {
        const resto = await this.findOneByCode(resto_code);
        const plats = await this.platModel.find({ plat_code: { $in: resto.plats } }).exec();
        return plats;
    }

    async create(createRestoDto: CreateRestoDto): Promise<Resto> {
        const { ar, fr, en, address, categoryIds, image, status, rating, workingTime, valid, statics, filterNames } = createRestoDto;

        const existingResto = await this.restoModel.findOne({
            $or: [
                { 'ar.name': ar.name },
                { 'fr.name': fr.name },
                { 'en.name': en.name }
            ]
        }).exec();
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
        const restoCode = await this.generateRestoCode();
        const createdResto = new this.restoModel({
            resto_code: restoCode,
            ar,
            en,
            fr,
            categories,
            address: addressObj,
            image: uploadedImages,
            status,
            rating,
            workingTime,
            valid,
            statics,
            filterNames: [{ ar: { name: ar.name }, fr: { name: fr.name }, en: { name: en.name } }]
        });
        const addFilterNameDto: AddFilterNameDto = {

            filterNames: filterNames
        };
        try {
            await this.filterService.addFilterName(addFilterNameDto);
        } catch (error) {
            console.error('Error adding filter names:', error);
            throw new NotFoundException('Error adding filter names');
        }

        const savedResto = await createdResto.save();

        return savedResto;
    }

    private async generateRestoCode(): Promise<string> {
        const restos = await this.restoModel.find().sort({ resto_code: -1 }).limit(1).exec();
        const lastRestoCode = restos.length ? restos[0].resto_code : 'resto_000';
        const newCodeNumber = parseInt(lastRestoCode.split('_')[1]) + 1;
        return `resto_${newCodeNumber.toString().padStart(3, '0')}`;
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


    async searchItems(arg: CreateRestoDto): Promise<any[]> {
        try {
            const pipeline = [
                {
                    $search: {
                        index: "autocompleteResto",
                        autocomplete: {
                            query: arg.name,
                            path: "name.en"
                        }
                    }
                },
                {
                    $limit: 10
                }
            ];
            return await this.restoModel.aggregate(pipeline).exec();
        } catch (error) {
            console.error("Error executing search query:", error);
            throw new Error("Search query failed");
        }
    }
}
