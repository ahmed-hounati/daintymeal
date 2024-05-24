import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Plat } from './plat.schema';

export type ReviewplatDocument = Reviewplat & Document;

@Schema()
class CreatedBy {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageProfile: string;
}

const CreatedBySchema = SchemaFactory.createForClass(CreatedBy);

@Schema({collection: 'reviewPlat'})
export class Reviewplat {
  @Prop({ type: CreatedBySchema, required: true })
  createdBy: CreatedBy;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ required: true, default: Date.now })
  addedAt: Date;

  @Prop({ type: Types.ObjectId, ref: Plat.name })
  plat: Types.ObjectId;
}

export const ReviewplatSchema = SchemaFactory.createForClass(Reviewplat);
