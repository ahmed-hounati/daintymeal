import { Module } from '@nestjs/common';
import { RestosService } from './resto.service';
import { RestosController } from './resto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resto, RestoSchema } from 'src/schema/resto.schema';
import { ConfigModule } from '@nestjs/config';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resto.name, schema: RestoSchema }]), 
    ConfigModule, 
    MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }]),],
  providers: [RestosService],
  controllers: [RestosController]
})
export class RestosModule { }