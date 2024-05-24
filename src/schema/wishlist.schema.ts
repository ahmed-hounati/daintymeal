import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Item } from './item.schema';

export type WishlistItemDocument = Wishlist & Document;

@Schema()
export class Wishlist {
    @Prop()
    user_code: string;


    @Prop({ type: [{ type: Object }], required: true })
    items: Item[];

    @Prop()
    addedAt: Date;
}

export const WishlistItemSchema = SchemaFactory.createForClass(Wishlist);