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
  ) { }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { createdBy, comment, rating, resto_code } = createCommentDto;
  
    
    const uploadedImage = await this.cloudinaryService.uploadImage(
      createdBy.imageProfile, 'Profile'
    );
  
    
    const resto = await this.restoModel.findOne({ resto_code }).exec();
    if (!resto) {
      throw new NotFoundException('Restaurant not found');
    }
    const createdComment = new this.commentModel({
      createdBy: {
        name: createdBy.name,
        imageProfile: uploadedImage.secure_url,
      },
      comment,
      rating,
      addedAt: new Date(),
      resto_code: resto.resto_code,  
    });
    await createdComment.save();
    const comments = await this.commentModel.find({ resto_code }).exec();
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = (totalRating / comments.length).toFixed(1);
    const updateRating = {};
  if (comment !== '') {
    updateRating['statics.countComments'] = comments.length;
  }

  if (rating !== 0) {
    updateRating['statics.contRatings'] = comments.length;
    updateRating['rating'] = averageRating;
  }

  await this.restoModel.findOneAndUpdate(
    { resto_code },
    updateRating,
    { new: true }
  );
  
    return createdComment;
  }
  

  async findAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async findCommentsByRestoCode(resto_code: string): Promise<Comment[]> {
    const restaurant = await this.restoModel.findOne({ resto_code }).exec();
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return this.commentModel.find({ resto_code: restaurant.resto_code }).exec();
  }
}
