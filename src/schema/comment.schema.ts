import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Resto } from './resto.schema';

export type CommentDocument = Comment & Document;

@Schema()
class CreatedBy {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageProfile: string;
}

const CreatedBySchema = SchemaFactory.createForClass(CreatedBy);

@Schema({collection: 'reviewResto'})
export class Comment {
  @Prop({ type: CreatedBySchema, required: true })
  createdBy: CreatedBy;

  @Prop()
  comment: string;

  @Prop({ min: 0, max: 5 , default: 0})
  rating: number;

  @Prop({ required: true, default: Date.now })
  addedAt: Date;

  @Prop({ required: true})
  resto_code: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
