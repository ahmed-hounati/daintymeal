import { Module } from '@nestjs/common';
import { RestosService } from './restos.service';
import { RestosController } from './restos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resto, RestoSchema } from '../schema/resto.schema';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';
import { CloudinaryService } from 'src/cloudinary.service';
import { Address, AddressSchema } from 'src/schema/address.schema';
import { FiltersService } from 'src/filters/filters.service';
import { FilterModule } from 'src/filters/filters.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Resto.name, schema: RestoSchema }]),
  MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }]),
  MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  FilterModule
],
  providers: [ RestosService, CloudinaryService],
  controllers: [RestosController],
  
  exports: [MongooseModule.forFeature([{ name: Resto.name, schema: RestoSchema }])], 
})
export class RestosModule { }
