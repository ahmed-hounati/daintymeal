import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistItemDocument } from '../schema/wishlist.schema';
import { Plat, PlatDocument } from 'src/schema/plat.schema';

@Injectable()
export class wishlistsService {
    constructor(@InjectModel(Wishlist.name) private wishlistModel: Model<WishlistItemDocument>,
        @InjectModel(Plat.name) private readonly platModel: Model<PlatDocument>) { }

    async create(userCode: string): Promise<Wishlist> {
        const createdWishlist = new this.wishlistModel({ user_code: userCode, items_codes: [], addedAt: new Date() });
        return createdWishlist.save();
    }

    async findAll(): Promise<Wishlist[]> {
        return this.wishlistModel.find().exec();
    }

    async findOne(user_code: string): Promise<Wishlist> {
        return this.wishlistModel.findById(user_code).exec();
    }

    async update(id: string, updatewishlistDto: any): Promise<Wishlist> {
        return this.wishlistModel.findByIdAndUpdate(id, updatewishlistDto, { new: true }).exec();
    }


    async addToWishlist(user_code: string, plat_code: string): Promise<Wishlist> {
        const wishlist = await this.wishlistModel.findOne({ user_code });

        if (!wishlist) {
            throw new NotFoundException('Wishlist not found for user ' + user_code);
        }
        const plat = await this.platModel.findOne({ plat_code });

        if (!plat) {
            throw new NotFoundException('Plat with code ' + plat_code + ' not found');
        }

        if (wishlist.plats.find((p) => p.plat_code === plat_code)) {
            throw new BadRequestException('Plat with code ' + plat_code + ' already exists in the wishlist');
        }
        wishlist.plats.push(plat);

        return wishlist.save();
    }


    async removeWishlist(user_code: string, plat_code: string): Promise<Wishlist> {
        const wishlist = await this.wishlistModel.findOne({ user_code });

        if (!wishlist) {
            throw new NotFoundException('Wishlist not found');
        }

        const platIndex = wishlist.plats.findIndex(p => p.plat_code === plat_code);

        if (platIndex === -1) {
            throw new NotFoundException('Plat not found in wishlist');
        }

        wishlist.plats.splice(platIndex, 1);

        return wishlist.save();
    }


}
