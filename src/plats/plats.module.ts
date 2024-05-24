import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plat, PlatSchema } from '../schema/plat.schema';
import { PlatService } from './plats.service';
import { PlatController } from './plats.controller';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plat.name, schema: PlatSchema },
      { name: Categorie.name, schema: CategorieSchema },
    ]),
  ],
  providers: [PlatService],
  controllers: [PlatController],
  exports: [MongooseModule],
})
export class PlatModule { }