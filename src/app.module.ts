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
import { AddressModule } from './address/address.module';
import { FilterModule } from './filters/filters.module';

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
    FilterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
