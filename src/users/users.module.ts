import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schema/user.schema';
import { Wishlist, WishlistItemSchema } from '../schema/wishlist.schema';
import { wishlistsService } from 'src/wishlists/wishlists.service';
import { PlatModule } from 'src/plats/plats.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistItemSchema }]), PlatModule],
    providers: [UsersService, wishlistsService],
    controllers: [UsersController],
    exports: [MongooseModule, wishlistsService]
})
export class UsersModule { }
