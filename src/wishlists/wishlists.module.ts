import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { wishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist, WishlistItemSchema } from '../schema/wishlist.schema';
import { PlatModule } from '../plats/plats.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistItemSchema }]), PlatModule],
    providers: [wishlistsService],
    controllers: [WishlistsController],
    exports: [MongooseModule, wishlistsService]
})
export class wishlistsModule { }
