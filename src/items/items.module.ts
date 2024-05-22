import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from '../schema/item.schema';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }])],
  providers: [ItemsService , CloudinaryService],
  controllers: [ItemsController],
  exports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])], 
})
export class ItemsModule {}
