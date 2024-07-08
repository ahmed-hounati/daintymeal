import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { Watchlist } from 'src/schema/wishlist.schema';

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addPlatToWatchlist(
    @Body() createWatchlistDto: CreateWatchlistDto,
  ): Promise<Watchlist> {
    return this.watchlistService.addPlatToWatchlist(createWatchlistDto);
  }

  @Get(':user_code')
  async getWatchlistByUser(@Param('user_code') user_code: string): Promise<Watchlist[]> {
    return this.watchlistService.getWatchlistByUser(user_code);
  }

  @Delete()
    removePlatFromWatchlist(@Body() createWatchlistDto: CreateWatchlistDto): Promise<void> {
        return this.watchlistService.removePlatFromWatchlist(createWatchlistDto);
    }
}
