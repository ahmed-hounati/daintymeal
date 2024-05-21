import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schema/item.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),ConfigModule],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule {}