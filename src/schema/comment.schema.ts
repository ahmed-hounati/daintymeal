import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
class CreatedBy {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageProfile: string;
}

const CreatedBySchema = SchemaFactory.createForClass(CreatedBy);

@Schema()
export class Comment {
  @Prop({ type: CreatedBySchema, required: true })
  createdBy: CreatedBy;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ required: true, default: Date.now })
  addedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
