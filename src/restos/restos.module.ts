import { Module } from '@nestjs/common';
import { RestosService } from './restos.service';
import { RestosController } from './restos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resto, RestoSchema } from '../schema/resto.schema';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Resto.name, schema: RestoSchema }]),
            MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }])],
  providers: [RestosService],
  controllers: [RestosController]
})
export class RestosModule { }
