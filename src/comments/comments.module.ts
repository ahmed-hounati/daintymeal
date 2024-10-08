import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary.service';
import { RestosModule } from 'src/restos/restos.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),ConfigModule,RestosModule],
  controllers: [CommentController],
  providers: [CommentService ,CloudinaryService],
})
export class CommentModule {}
