import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { wishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist, WishlistItemSchema } from '../schema/wishlist.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistItemSchema }])],
    providers: [wishlistsService],
    controllers: [WishlistsController],
    exports: [MongooseModule]
})
export class wishlistsModule { }
