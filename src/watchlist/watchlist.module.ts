import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Watchlist, WatchlistSchema } from 'src/schema/wishlist.schema';
import { PlatModule } from 'src/plats/plats.module';
import { Plat, PlatSchema } from 'src/schema/plat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Watchlist.name, schema: WatchlistSchema }]),
    MongooseModule.forFeature([{ name: Plat.name, schema: PlatSchema }]),
  ],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}