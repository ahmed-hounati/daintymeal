import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Categorie } from './category.schema';

export type PlatDocument = Plat & Document;

@Schema()
export class Plat {
    @Prop({ required: true })
    plat_code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: [{ type: Object }], required: true })
    category: Categorie;

    @Prop([String])
    image: string[];

    @Prop({ type: Object })
    statics: {
        contRatings: number;
        countSaves: number;
        countOrders: number;
    };

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    valid: boolean;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    item_price: string;

    @Prop({ required: true })
    currency: string;

    @Prop({ default: 0 })
    discount: number;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const PlatSchema = SchemaFactory.createForClass(Plat);
