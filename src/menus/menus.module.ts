import { Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Categorie, CategorieSchema } from 'src/schema/category.schema';
import { Resto, RestoSchema } from 'src/schema/resto.schema';
import { Plat, PlatSchema } from 'src/schema/plat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }]),
    MongooseModule.forFeature([{ name: Resto.name, schema: RestoSchema }]),
    MongooseModule.forFeature([{ name: Plat.name, schema: PlatSchema }]),
  ],
  providers: [MenusService],
  controllers: [MenusController],
})
export class MenusModule {}
