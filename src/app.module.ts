import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorieModule } from './categories/categories.module';
import { CommentModule } from './comments/comments.module';
import { ItemsModule } from './items/items.module';
import { RestosModule } from './restos/restos.module';
import { ReviewplatsModule } from './reviewplats/reviewplats.module';
import { FilterModule } from './filters/filters.module';
import { AddressModule } from './address/address.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { wishlistsService } from './wishlists/wishlists.service';
import { WishlistsController } from './wishlists/wishlists.controller';
import { wishlistsModule } from './wishlists/wishlists.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CategorieModule,
    CommentModule,
    ItemsModule,
    RestosModule,
    ReviewplatsModule,
    AddressModule,
    FilterModule,
    AddressModule,
    UsersModule,
    wishlistsModule,
    PaymentsModule
  ],
  controllers: [AppController, UsersController, WishlistsController],
  providers: [AppService, UsersService, wishlistsService],
})
export class AppModule { }
