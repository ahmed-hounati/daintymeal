import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Plat } from '../schema/plat.schema';

export type WishlistItemDocument = Wishlist & Document;

@Schema()
export class Wishlist {
    @Prop()
    user_code: string;

    @Prop({ type: [{ type: Object }], required: true })
    plats: Plat[];

    @Prop()
    addedAt: Date;
}

export const WishlistItemSchema = SchemaFactory.createForClass(Wishlist);