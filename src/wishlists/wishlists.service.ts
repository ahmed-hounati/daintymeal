import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistItemDocument } from '../schema/wishlist.schema';

@Injectable()
export class wishlistsService {
    constructor(@InjectModel(Wishlist.name) private wishlistModel: Model<WishlistItemDocument>) { }

    async create(userCode: string): Promise<Wishlist> {
        const createdWishlist = new this.wishlistModel({ user_code: userCode, items_codes: [], addedAt: new Date() });
        return createdWishlist.save();
    }

    async findAll(): Promise<Wishlist[]> {
        return this.wishlistModel.find().exec();
    }

    async findOne(id: string): Promise<Wishlist> {
        return this.wishlistModel.findById(id).exec();
    }

    async update(id: string, updatewishlistDto: any): Promise<Wishlist> {
        return this.wishlistModel.findByIdAndUpdate(id, updatewishlistDto, { new: true }).exec();
    }

}
