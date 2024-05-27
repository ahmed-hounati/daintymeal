import { Module } from '@nestjs/common';
import { ReviewplatsService } from './reviewplats.service';
import { ReviewplatsController } from './reviewplats.controller';
import { Reviewplat, ReviewplatSchema } from 'src/schema/reviewplat.schema';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryService } from 'src/cloudinary.service';
import { PlatModule } from 'src/plats/plats.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Reviewplat.name, schema: ReviewplatSchema }]),ConfigModule,PlatModule],
  controllers:[ReviewplatsController],
  providers: [ReviewplatsService, CloudinaryService]
})
export class ReviewplatsModule {}
