import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Interface } from 'readline';
import { Categorie } from './category.schema';


export interface Name {
    en: string;
    fr: string;
    ar: string;
}

enum Status {
    active = "ACTIVE",
    inactive = "INACTIVE",
    banned = "BANNED"
}


export interface Statics {
    contRatings: number;
    countSaves: number;
    countOrders: number;
}


export interface ItemInterface {
    _id: string;
    name: Name;
    categories: Categorie;
    image: string[];
    status: Status;
    statics: Statics;
    created_at: Date;
    valid: boolean;
}

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
    @Prop({ required: true })
    item_code: string;

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

    @Prop({ required: true })
    created_at: Date;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
