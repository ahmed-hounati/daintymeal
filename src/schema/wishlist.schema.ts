// src/schema/watchlist.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Plat } from './plat.schema';

export type WatchlistDocument = Watchlist & Document;

@Schema()
export class Watchlist {
  @Prop({ required: true })
  user_code: string;

  @Prop({ type: Types.ObjectId, ref: Plat.name, required: true })  // Reference to Plat schema
  plat: Plat;
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);
