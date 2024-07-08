import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plat, PlatSchema } from '../schema/plat.schema';
import { PlatService } from './plats.service';
import { PlatController } from './plats.controller';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';
import { Resto, RestoSchema } from 'src/schema/resto.schema';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plat.name, schema: PlatSchema },
      { name: Categorie.name, schema: CategorieSchema },
      { name: Resto.name, schema: RestoSchema },

    ]),
  ],
  providers: [PlatService ,CloudinaryService],
  controllers: [PlatController],
  exports: [MongooseModule],
})
export class PlatModule { }