import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; 
import { Categorie, CategorieSchema } from 'src/schema/category.schema';
import { CategorieService } from './categories.service';
import { CategorieController } from './categories.controller';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }]),
    ConfigModule
  ],
  controllers: [CategorieController],
  providers: [CategorieService , CloudinaryService],
})
export class CategorieModule {}

