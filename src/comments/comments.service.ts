import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CloudinaryService } from 'src/cloudinary.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private cloudinaryService: CloudinaryService, 
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { createdBy, comment, rating } = createCommentDto;

    
    const uploadedImage = await this.cloudinaryService.uploadImage(
      createdBy.imageProfile, 'Profile'
    );
    const createdComment = new this.commentModel({
      createdBy: {
        name: createdBy.name,
        imageProfile: uploadedImage.secure_url, 
      },
      comment,
      rating,
      addedAt: new Date(),
    });

    return createdComment.save();
  }

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }
}
