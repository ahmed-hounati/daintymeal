import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary.service';
import { Item, ItemDocument } from 'src/schema/item.schema';
import { Reviewplat, ReviewplatDocument } from 'src/schema/reviewplat.schema';
import { CreateReviewplatDto } from './dto/create-reviewplat.dto';

@Injectable()
export class ReviewplatsService {
    constructor(
        @InjectModel(Reviewplat.name) private commentModel: Model<ReviewplatDocument>,
        @InjectModel(Item.name) private readonly restoModel: Model<ItemDocument>,
        private cloudinaryService: CloudinaryService, 
      ) {}
    
      async create(createReviewplatDto: CreateReviewplatDto): Promise<Reviewplat> {
        const { createdBy, comment, rating, itemId} = createReviewplatDto;
    
        
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
          item: itemId,
        });
    
        await  createdComment.save();
        const comments = await this.commentModel.find({ item: itemId }).exec();
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = (totalRating / comments.length).toFixed(1);
    
        const resto = await this.restoModel.findById(itemId).exec();
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
    
    
    
      async findAll(): Promise<Reviewplat[]> {
        return this.commentModel.find().exec();
      }
}
