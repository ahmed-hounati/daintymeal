import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CloudinaryService } from 'src/cloudinary.service';
import { Resto, RestoDocument } from 'src/schema/resto.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Resto.name) private readonly restoModel: Model<RestoDocument>,
    private cloudinaryService: CloudinaryService, 
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { createdBy, comment, rating, restoId} = createCommentDto;

    
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
      resto: restoId,
    });

    await  createdComment.save();
    const comments = await this.commentModel.find({ resto: restoId }).exec();
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = (totalRating / comments.length).toFixed(1);

    const resto = await this.restoModel.findById(restoId).exec();
    if (!resto) {
      throw new NotFoundException('Restaurant not found');
    }
    const updateRating = {
      'statics.contRatings' : comments.length,
      'rating':averageRating
    }
    await this.restoModel.findByIdAndUpdate(
      { _id: resto._id},
      updateRating
    );
    
    return createdComment;
  }



  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }
}
