// src/watchlist/watchlist.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Watchlist, WatchlistDocument } from 'src/schema/wishlist.schema';
import { Plat, PlatDocument } from '../schema/plat.schema';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist.name)
    private readonly watchlistModel: Model<WatchlistDocument>,
    @InjectModel(Plat.name)
    private readonly platModel: Model<PlatDocument>,
  ) { }

  async addPlatToWatchlist(createWatchlistDto: CreateWatchlistDto): Promise<Watchlist> {
    const { user_code, plat_code } = createWatchlistDto;

    const plat = await this.platModel.findOne({ plat_code }).exec();
    if (!plat) {
      throw new NotFoundException('Plat not found');
    }
    const existingWatchlistEntry = await this.watchlistModel.findOne({ user_code, plat: plat._id }).exec();
    if (existingWatchlistEntry) {
      throw new ConflictException('Plat already in watchlist');
    }

    const newWatchlistEntry = new this.watchlistModel({
      user_code,
      plat,
    });

    return newWatchlistEntry.save();
  }

  async getWatchlistByUser(user_code: string): Promise<Watchlist[]> {
    return this.watchlistModel.find({ user_code }).populate('plat').exec();
  }

  async removePlatFromWatchlist(createWatchlistDto: CreateWatchlistDto): Promise<void> {
    const { user_code, plat_code } = createWatchlistDto;

    
    const plat = await this.platModel.findOne({ plat_code }).exec();
    

    if (plat) {
        await this.watchlistModel.deleteOne({ user_code, plat: plat._id }).exec();
    } else {
        throw new Error('Plat not found');
    }
}


}
